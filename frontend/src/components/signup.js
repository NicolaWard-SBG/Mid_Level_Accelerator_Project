import React, { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

const Signup = ({ onUserSignup }) => {
  const [signupFormData, setSignupFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSignupFormData((prevData) => ({ ...prevData, [name]: value }));

    // Clear email error if email becomes valid
    if (name === "email" && formErrors.email) {
      if (validateEmailAddress(value)) {
        setFormErrors((prevErrors) => ({ ...prevErrors, email: null }));
      }
    }
  };

  const validateEmailAddress = (emailAddress) => {
    if (!emailAddress.includes("@")) {
      return "The email address must include an '@' symbol.";
    }
    if (!emailAddress.includes(".")) {
      return "The email address must include a '.' to specify the domain (e.g. '.com', '.net').";
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailAddress)) {
      return "The email address format is invalid. Please enter a valid email address (e.g. 'example@domain.com').";
    }
    return null;
  };

  const handleSignupSubmit = async (event) => {
    event.preventDefault();
    setFormErrors({});

    const emailValidationError = validateEmailAddress(signupFormData.email);
    if (emailValidationError) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        email: emailValidationError,
      }));
      return;
    }

    if (
      signupFormData.username.length < 4 ||
      signupFormData.username.length > 20
    ) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        username: "Username must be between 4 and 20 characters.",
      }));
      return;
    }

    if (signupFormData.password.length < 8) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 8 characters.",
      }));
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/signup",
        signupFormData
      );

      if (response.data.message === "User registered successfully!") {
        console.log("User registered successfully.");
        onUserSignup(signupFormData.username);
      }
    } catch (error) {
      console.error("Error during user registration:", error);

      if (error.response?.status === 400) {
        const validationErrors = error.response?.data;
        setFormErrors(validationErrors || {});
      } else {
        setFormErrors({
          general: "An error occurred during registration. Please try again.",
        });
      }
    }
  };

  return (
    <div>
      {formErrors.general && (
        <Alert variant="danger">{formErrors.general}</Alert>
      )}

      {formErrors.general && (
        <Alert variant="danger" role="alert">
          {formErrors.general}
        </Alert>
      )}

      <Form onSubmit={handleSignupSubmit} role="form">
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your email"
            name="email"
            value={signupFormData.email}
            onChange={handleInputChange}
            isInvalid={!!formErrors.email} // Highlight input if there's an error
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="usernameInput">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your username"
            name="username"
            value={signupFormData.username}
            onChange={handleInputChange}
            isInvalid={!!formErrors.username}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.username}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="passwordInput">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            name="password"
            value={signupFormData.password}
            onChange={handleInputChange}
            isInvalid={!!formErrors.password}
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" style={{ marginTop: "20px" }}>
          Sign Up
        </Button>
      </Form>

      <p className="mt-3">
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </div>
  );
};

export default Signup;
