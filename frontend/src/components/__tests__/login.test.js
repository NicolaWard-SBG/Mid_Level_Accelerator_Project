import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Login from "../login";
import "@testing-library/jest-dom/extend-expect";

jest.mock("axios");

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("Login Component", () => {
  const mockOnLogin = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the login form", () => {
    renderWithRouter(<Login onLogin={mockOnLogin} />);

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("updates state on input change", () => {
    renderWithRouter(<Login onLogin={mockOnLogin} />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(usernameInput.value).toBe("testuser");
    expect(passwordInput.value).toBe("password123");
  });

  it("submits the form and calls onLogin on successful login", async () => {
    axios.post.mockResolvedValueOnce({ status: 200 });

    renderWithRouter(<Login onLogin={mockOnLogin} />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(loginButton);

    await waitFor(() => expect(mockOnLogin).toHaveBeenCalledWith("testuser"));
    expect(mockOnLogin).toHaveBeenCalledTimes(1);
  });

  it("displays error message on failed login", async () => {
    axios.post.mockRejectedValueOnce(new Error("Failed to login"));

    renderWithRouter(<Login onLogin={mockOnLogin} />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    fireEvent.change(usernameInput, { target: { value: "wronguser" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
    fireEvent.click(loginButton);

    const errorMessage = await screen.findByText(/failed to login/i);
    expect(errorMessage).toBeInTheDocument();
    expect(mockOnLogin).not.toHaveBeenCalled();
  });

  it("displays error message passed from location state", () => {
    render(
      <MemoryRouter
        initialEntries={[
          { pathname: "/", state: { message: "Session expired" } },
        ]}
      >
        <Routes>
          <Route path="/" element={<Login onLogin={mockOnLogin} />} />
        </Routes>
      </MemoryRouter>
    );

    const warningMessage = screen.getByText(/session expired/i);
    expect(warningMessage).toBeInTheDocument();
  });
});
