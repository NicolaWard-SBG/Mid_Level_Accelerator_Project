const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

// Mock implementation of FitnessApp class for testing
class MockFitnessApp {
  constructor() {
    this.registeredUsers = [];
    this.profile = {};
    this.notifications = [];
    this.workoutHistory = [];
    this.trackingEnabled = false;
  }

  register(user) {
    if (!user.email) throw new Error('Email is required');
    if (this.registeredUsers.some(u => u.email === user.email)) {
      throw new Error('Email already in use');
    }
    this.registeredUsers.push(user);
    this.notifications.push('Account created successfully!');
    return true;
  }

  login(credentials) {
    const user = this.registeredUsers.find(u => u.email === credentials.email);
    if (user && user.password === credentials.password) {
      return true;
    }
    throw new Error('Invalid login');
  }

  logWorkout(workout) {
    if (!workout.duration) throw new Error('Duration is required');
    if (parseInt(workout.duration) <= 0) throw new Error('Duration must be a positive number');
    this.workoutHistory.push(workout);
    return true;
  }

  getNotification() {
    return this.notifications.pop();
  }

  getWorkoutHistory() {
    return this.workoutHistory;
  }
}

let app, registrationData, accountCreated, errorMessage;

Given('a new user has opened the app', function () {
  app = new MockFitnessApp();
  registrationData = {};
});

When('they navigate to the registration page and fill in all required fields \\(e.g., email, password, etc.)', function () {
  registrationData = { email: 'test@example.com', password: 'password123' };
  accountCreated = app.register(registrationData);
});

Then('the system should create an account and display a confirmation message', function () {
  assert.strictEqual(accountCreated, true);
  assert.strictEqual(app.getNotification(), 'Account created successfully!');
});


When('they leave the email field empty and try to register', function () {
  registrationData = { email: '', password: 'password123' };
  try {
    accountCreated = app.register(registrationData);
  } catch (error) {
    errorMessage = error.message;
  }
});

Then('an error message "Email is required" should be displayed', function () {
  assert.strictEqual(errorMessage, 'Email is required');
});


When('they enter an email that is already registered', function () {
  app.register({ email: 'test@example.com', password: 'password123' });
  try {
    accountCreated = app.register({ email: 'test@example.com', password: 'anotherPassword' });
  } catch (error) {
    errorMessage = error.message;
  }
});

Then('an error message "Email already in use" should be displayed', function () {
  assert.strictEqual(errorMessage, 'Email already in use');
});