Feature: User Registration
  As a new user,
  I want to create an account,
  So that I can securely save and track my fitness data.

  Scenario: Successful account creation
    Given a new user has opened the app
    When they navigate to the registration page and fill in all required fields (e.g., email, password, etc.)
    Then the system should create an account and display a confirmation message

  Scenario: Account creation with missing required fields
    Given a new user has opened the app
    When they leave the email field empty and try to register
    Then an error message "Email is required" should be displayed

  Scenario: Account creation with an already registered email
    Given a new user has opened the app
    When they enter an email that is already registered
    Then an error message "Email already in use" should be displayed