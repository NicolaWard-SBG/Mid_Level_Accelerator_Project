const assert = require('assert');
const { Given, When, Then } = require("@cucumber/cucumber");

let isLoggedIn = false;

const isUserLoggedIn = () => {
  return isLoggedIn;
};

const logout = () => {
  isLoggedIn = false;
};

const login = (username, password) => {
  if (username === "correctUser" && password === "correctPassword") {
    isLoggedIn = true;
    return { success: true };
  } else {
    isLoggedIn = false;
    return { success: false, error: "Incorrect username or password" };
  }
};

Given("I am a registered user", function () {
  this.user = {
    username: "correctUser",
    password: "correctPassword",
  };
  logout();
  // Ensure the user is logged out
  assert.strictEqual(isLoggedIn, false, "User should be logged out");
});

When("I login with correct credentials", function () {
  this.loginResult = login(this.user.username, this.user.password);
});

Then("I should see my personal information", function () {
  // Ensure login was successful
  assert.strictEqual(this.loginResult.success, true, "Login should be successful, but it failed");
});

Given("I am a logged-out user", function () {
  logout();
  // Ensure the user is logged out
  assert.strictEqual(isLoggedIn, false, "User should be logged out");
});

When("I try to access my personal information", function () {
  this.accessResult = isUserLoggedIn();
});

Then("I should not see my personal information", function () {
  // Ensure no access to personal information when logged out
  assert.strictEqual(this.accessResult, false, "User should not be able to see personal information when logged out");
});

When("I log in with incorrect credentials", function () {
  this.loginResult = login("wrongUser", "wrongPassword");
});

Then("access to personal information should be denied", function () {
  // Ensure login failed with incorrect credentials
  assert.strictEqual(this.loginResult.success, false, "Access should be denied for incorrect credentials");
});

Then("I should see an error message for incorrect login", function () {
  // Ensure error message is displayed
  assert.strictEqual(this.loginResult.error, "Incorrect username or password", "Error message should be displayed for incorrect login");
});