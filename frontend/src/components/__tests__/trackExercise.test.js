import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TrackExercise from "../trackExercise";
import { trackExercise } from "../../api";

jest.mock("../../api");

describe("TrackExercise Component", () => {
  const currentUser = "testuser";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the form and input fields", () => {
    render(<TrackExercise currentUser={currentUser} />);

    expect(screen.getByText(/Track exercise/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select Date:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Duration \(minutes\):/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Save Activity/i })
    ).toBeInTheDocument();
  });

  test("calls the API and resets the form on valid submission", async () => {
    const currentUser = "testuser";
    const mockResponse = { data: "Activity logged successfully" };
    trackExercise.mockResolvedValueOnce(mockResponse);

    render(<TrackExercise currentUser={currentUser} />);

    // Fill in the form fields
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: "Cycling in the park" },
    });
    fireEvent.change(screen.getByLabelText(/Duration/i), {
      target: { value: "45" },
    });
    fireEvent.click(screen.getByLabelText("Cycling"));

    // Submit the form
    fireEvent.click(screen.getByText(/Save Activity/i));

    // Wait for the API call to be made and form to be reset
    await waitFor(() => {
      expect(trackExercise).toHaveBeenCalledWith(
        expect.objectContaining({
          username: currentUser,
          exerciseType: "Cycling",
          description: "Cycling in the park",
          duration: "45",
          date: expect.any(Date),
        })
      );

      // Check if the form fields are reset
      expect(screen.getByLabelText(/Description/i).value).toBe("");
      expect(screen.getByLabelText(/Duration/i).value).toBe("0");
      expect(
        screen.getByLabelText("Cycling").closest("button")
      ).not.toHaveClass("selected");
    });

    // Check for success message
    expect(
      screen.getByText("Activity logged successfully! Well done!")
    ).toBeInTheDocument();
  });

  test("highlights selected exercise type", () => {
    render(<TrackExercise currentUser={currentUser} />);

    const runningIcon = screen.getByLabelText(/Running icon button/i);
    fireEvent.click(runningIcon);

    expect(runningIcon.classList.contains("selected")).toBe(true);
  });
});
