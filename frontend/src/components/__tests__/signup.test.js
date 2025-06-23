import React from "react";
import { act } from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import Signup from "../signup";

jest.mock("axios");

describe("Signup Form", () => {
  test("renders an input for the email address", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Signup />
        </MemoryRouter>
      );
    });

    const emailInput = screen.getByPlaceholderText(/Enter your email/i);
    expect(emailInput).toBeInTheDocument();
  });

  test("renders an input for the username", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Signup />
        </MemoryRouter>
      );
    });

    const usernameInput = screen.getByPlaceholderText(/Enter your username/i);
    expect(usernameInput).toBeInTheDocument();
  });

  test("renders an input for the password", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Signup />
        </MemoryRouter>
      );
    });

    const passwordInput = screen.getByPlaceholderText(/Enter your password/i);
    expect(passwordInput).toBeInTheDocument();
  });

  test("submits the form with valid data and calls onSignup", async () => {
    const mockOnSignup = jest.fn();
    const mockResponse = { data: { message: "User registered successfully!" } };

    axios.post.mockResolvedValueOnce(mockResponse);

    await act(async () => {
      render(
        <MemoryRouter>
          <Signup onUserSignup={mockOnSignup} />
        </MemoryRouter>
      );
    });

    fireEvent.change(screen.getByPlaceholderText("Enter your email"), {
      target: { value: "test@example.com", name: "email" },
    });

    fireEvent.change(screen.getByPlaceholderText("Enter your username"), {
      target: { value: "testuser", name: "username" },
    });

    fireEvent.change(screen.getByPlaceholderText("Enter your password"), {
      target: { value: "password123", name: "password" },
    });

    fireEvent.click(screen.getByText("Sign Up"));

    await waitFor(() => {
      expect(mockOnSignup).toHaveBeenCalledWith("testuser");
    });

    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:8080/api/auth/signup",
      {
        email: "test@example.com",
        username: "testuser",
        password: "password123",
      }
    );
  });
});
