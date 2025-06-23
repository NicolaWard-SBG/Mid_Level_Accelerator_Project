import React, { act } from "react";
import "@testing-library/jest-dom";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import Goals from "../goals";
import axios from "axios";

jest.mock("axios");

describe("Goals Component", () => {
  const mockUser = "123";

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: { goals: [] } });
    axios.post.mockResolvedValue({
      data: {
        goal: {
          _id: "1",
          goal_type: "New Goal",
          date: "2023-11-01",
          status: "pending",
        },
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the list of goals", async () => {
    const mockGoals = [
      {
        _id: "1",
        goal_type: "Run 5k",
        status: "incomplete",
        date: "2023-10-01",
      },
      {
        _id: "2",
        goal_type: "Read a book",
        status: "incomplete",
        date: "2023-10-05",
      },
    ];

    axios.get.mockResolvedValue({ data: { goals: mockGoals } });

    await act(async () => {
      render(<Goals currentUser={mockUser} />);
    });

    const goalList = await screen.findByRole("list");
    const listItems = within(goalList).getAllByRole("listitem");

    expect(listItems).toHaveLength(2);
    expect(within(listItems[0]).getByText(/Run 5k/)).toBeInTheDocument();
    expect(within(listItems[1]).getByText(/Read a book/)).toBeInTheDocument();
  });

  test("updates input fields when adding a new goal", async () => {
    await act(async () => {
      render(<Goals currentUser={mockUser} />);
    });

    const goalTypeInput = screen.getByPlaceholderText("Enter a new goal");
    const dateInput = screen.getByLabelText("Set goal date", {
      selector: 'input[type="date"]',
    });

    await act(async () => {
      fireEvent.change(goalTypeInput, { target: { value: "New Goal" } });
      fireEvent.change(dateInput, { target: { value: "2023-11-01" } });
    });

    expect(goalTypeInput.value).toBe("New Goal");
    expect(dateInput.value).toBe("2023-11-01");
  });

  test("alerts when trying to add a goal without a type or date", async () => {
    jest.spyOn(window, "alert").mockImplementation(() => {});

    await act(async () => {
      render(<Goals currentUser={mockUser} />);
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Add Goal"));
    });

    expect(window.alert).toHaveBeenCalledWith(
      "Please enter both a goal type and a target date."
    );
  });

  test("handles fetch goals error", async () => {
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    axios.get.mockRejectedValueOnce(new Error("Failed to fetch goals"));

    await act(async () => {
      render(<Goals currentUser={mockUser} />);
    });

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error fetching user goals:",
        expect.any(Error)
      );
    });

    consoleErrorSpy.mockRestore();
  });

  test("marks a goal as completed", async () => {
    const mockGoals = [
      {
        _id: "1",
        goal_type: "Run 5k",
        status: "incomplete",
        date: "2023-10-01",
      },
    ];

    axios.get.mockResolvedValue({ data: { goals: mockGoals } });

    await act(async () => {
      render(<Goals currentUser={mockUser} />);
    });

    const goalList = await screen.findByRole("list");
    const listItems = within(goalList).getAllByRole("listitem");

    const markAsCompletedButton = within(listItems[0]).getByText(
      "Mark as Completed"
    );

    axios.put.mockResolvedValue({
      data: {
        _id: "1",
        goal_type: "Run 5k",
        date: "2023-10-01",
        status: "completed",
      },
    });

    await act(async () => {
      fireEvent.click(markAsCompletedButton);
    });

    await waitFor(() => {
      const updatedGoalList = screen.getByRole("list");
      const updatedListItems = within(updatedGoalList).getAllByRole("listitem");

      expect(updatedListItems).toHaveLength(1);
    });

    const updatedGoalList = screen.getByRole("list");
    const updatedListItems = within(updatedGoalList).getAllByRole("listitem");

    expect(within(updatedListItems[0]).getByText(/Run 5k/)).toBeInTheDocument();
    expect(
      within(updatedListItems[0]).getByText(/Status: completed/)
    ).toBeInTheDocument();
  });
});
