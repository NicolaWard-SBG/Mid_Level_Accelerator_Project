import React, { act } from "react";
import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import NavbarComponent from "../navbar";

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("NavbarComponent", () => {
  it("shows a confirmation popup when the logout button is clicked", () => {
    window.confirm = jest.fn().mockImplementation(() => true);

    const mockLogout = jest.fn();

    const { getByText } = render(<NavbarComponent onLogout={mockLogout} />);

    // eslint-disable-next-line testing-library/prefer-screen-queries
    fireEvent.click(getByText(/logout/i));

    // Check that the confirmation popup appears with the expected message
    expect(window.confirm).toHaveBeenCalledWith("Do you want to logout?");

    // Check that the logout function is called after the confirmation
    expect(mockLogout).toHaveBeenCalled();
  });

  it("navigates to the Track New Exercise page when the link is clicked", () => {
    const { getByText } = render(<NavbarComponent />);

    fireEvent.click(getByText(/Track New Exercise/i));

    // Check that the navigate function is called with the correct route
    expect(mockNavigate).toHaveBeenCalledWith("/trackExercise");
  });

  it("navigates to the correct page when keyboard shortcuts are used", () => {
    const { getByText } = render(<NavbarComponent />);

    act(() => {
      fireEvent.keyDown(document, { key: "t", target: { tagName: "BODY" } });
    });
    expect(mockNavigate).toHaveBeenCalledWith("/trackExercise");

    act(() => {
      fireEvent.keyDown(document, { key: "s", target: { tagName: "BODY" } });
    });
    expect(mockNavigate).toHaveBeenCalledWith("/statistics");

    act(() => {
      fireEvent.keyDown(document, { key: "j", target: { tagName: "BODY" } });
    });
    expect(mockNavigate).toHaveBeenCalledWith("/journal");

    act(() => {
      fireEvent.keyDown(document, { key: "g", target: { tagName: "BODY" } });
    });
    expect(mockNavigate).toHaveBeenCalledWith("/goals");
  });

  it("shows the ShortcutModal when the Keyboard Shortcuts link is clicked", () => {
    const { getByText, getByRole } = render(<NavbarComponent />);

    act(() => {
      fireEvent.click(getByText(/Keyboard Shortcuts/i));
    });

    expect(getByRole("dialog")).toBeInTheDocument();
  });

  // Restore the original window.confirm after each test
  afterEach(() => {
    jest.restoreAllMocks();
  });
});
