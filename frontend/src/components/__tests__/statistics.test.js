import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import Statistics from "../statistics";

// Mock axios
jest.mock("axios");

// Mock console.error to suppress error messages during tests
beforeAll(() => {
  jest.spyOn(global.console, "error").mockImplementation(() => jest.fn());
});

describe("Statistics Component", () => {
  const mockUser = "testUser";

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("displays loading state initially", () => {
    render(<Statistics currentUser={mockUser} />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test("displays error message when the API call fails", async () => {
    axios.post.mockRejectedValueOnce(new Error("API Error"));

    render(<Statistics currentUser={mockUser} />);

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    const errorMessage = await screen.findByText(
      /an error occurred while fetching exercise statistics./i
    );
    expect(errorMessage).toBeInTheDocument();
  });

  test("displays 'No data available' if no data is returned for the user", async () => {
    axios.post.mockResolvedValueOnce({
      data: {
        data: {
          filteredStats: {
            success: true,
            errors: [],
            results: [], // No results returned
          },
        },
      },
    });

    render(<Statistics currentUser={mockUser} />);

    const noDataMessage = await screen.findByText(
      /no exercise data available for you yet/i
    );
    expect(noDataMessage).toBeInTheDocument();
  });

  test("renders user's exercise data correctly", async () => {
    axios.post.mockResolvedValueOnce({
      data: {
        data: {
          filteredStats: {
            success: true,
            errors: [],
            results: [
              {
                username: mockUser,
                exercises: [
                  { exerciseType: "Running", totalDuration: 120 },
                  { exerciseType: "Swimming", totalDuration: 90 },
                ],
              },
            ],
          },
        },
      },
    });

    render(<Statistics currentUser={mockUser} />);

    const heading = await screen.findByText(
      /great work, testUser! here's your exercise summary:/i
    );
    expect(heading).toBeInTheDocument();

    expect(screen.getByText(/running/i)).toBeInTheDocument();
    expect(screen.getByText(/total duration: 120 min/i)).toBeInTheDocument();

    expect(screen.getByText(/swimming/i)).toBeInTheDocument();
    expect(screen.getByText(/total duration: 90 min/i)).toBeInTheDocument();
  });

  test("handles multiple users' data correctly", async () => {
    axios.post.mockResolvedValueOnce({
      data: {
        data: {
          filteredStats: {
            success: true,
            errors: [],
            results: [
              {
                username: "anotherUser",
                exercises: [{ exerciseType: "Cycling", totalDuration: 200 }],
              },
              {
                username: mockUser,
                exercises: [{ exerciseType: "Gym", totalDuration: 150 }],
              },
            ],
          },
        },
      },
    });

    render(<Statistics currentUser={mockUser} />);

    const heading = await screen.findByText(
      /great work, testUser! here's your exercise summary:/i
    );
    expect(heading).toBeInTheDocument();

    expect(screen.getByText(/gym/i)).toBeInTheDocument();
    expect(screen.getByText(/total duration: 150 min/i)).toBeInTheDocument();

    // Ensure data for other users is not shown
    expect(screen.queryByText(/cycling/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/total duration: 200 min/i)
    ).not.toBeInTheDocument();
  });
});
