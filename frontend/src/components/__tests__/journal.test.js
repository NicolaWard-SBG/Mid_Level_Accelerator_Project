import React from "react";
import { act } from "react";
import { render, screen } from "@testing-library/react";
import axios from "axios";
import moment from "moment";
import Journal from "../journal";
import "@testing-library/jest-dom/extend-expect";

jest.mock("axios");

describe("Journal Component", () => {
  const mockCurrentUser = "testUser";

  beforeEach(() => {
    jest.resetAllMocks();
    axios.get.mockImplementation(() =>
      Promise.resolve({ data: { stats: [] } })
    );

    // Mock the current date to ensure consistent results
    jest.spyOn(global.Date, "now").mockImplementation(() => {
      return new Date("2025-01-09T00:00:00Z").getTime(); // Mock date
    });
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Clean up mocks after each test
  });

  it("handles API errors gracefully", async () => {
    axios.get.mockRejectedValue(new Error("Network Error"));

    // These dates should now match the mocked date (2025-01-09)
    const startOfWeek = moment("2025-01-05").startOf("week").format("YYYY-MM-DD");
    const endOfWeek = moment("2025-01-11").endOf("week").format("YYYY-MM-DD");

    await act(async () => {
      render(<Journal currentUser={mockCurrentUser} />);
    });

    // Verify that axios.get is called with the correct URL
    expect(axios.get).toHaveBeenCalledWith(
      `http://localhost:5050/stats/weekly/?user=testUser&start=${startOfWeek}&end=${endOfWeek}`
    );

    // Verify that the "No exercises found" message is displayed when the API fails
    expect(
      await screen.findByText("No exercises found for this period.")
    ).toBeInTheDocument();
  });
});