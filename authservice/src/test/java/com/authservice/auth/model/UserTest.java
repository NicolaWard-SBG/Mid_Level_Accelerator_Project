package com.authservice.auth.model;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class UserTest {

    private Validator validator;
    private User user;

    @BeforeEach
    void setup() {
        // Initialize the validator factory
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();

        // Create a valid User instance for reuse in tests
        user = new User();
        user.setUsername("validUser");
        user.setPassword("validPassword123");
        user.setEmail("valid@example.com");
    }

    @Test
    void testValidUser() {
        // Ensure a valid user passes validation
        Set<ConstraintViolation<User>> violations = validator.validate(user);
        assertTrue(violations.isEmpty(), "Valid user should not have validation errors");
    }

    @Test
    void testInvalidUsernameTooShort() {
        // Username too short
        user.setUsername("abc");
        Set<ConstraintViolation<User>> violations = validator.validate(user);

        assertFalse(violations.isEmpty());
        assertEquals("Username must be between 4 and 20 characters", violations.iterator().next().getMessage());
    }

    @Test
    void testInvalidUsernameTooLong() {
        // Username too long
        user.setUsername("a".repeat(21));
        Set<ConstraintViolation<User>> violations = validator.validate(user);

        assertFalse(violations.isEmpty());
        assertEquals("Username must be between 4 and 20 characters", violations.iterator().next().getMessage());
    }

    @Test
    void testInvalidPasswordTooShort() {
        // Password too short
        user.setPassword("short");
        Set<ConstraintViolation<User>> violations = validator.validate(user);

        assertFalse(violations.isEmpty());
        assertEquals("Password must be at least 8 characters", violations.iterator().next().getMessage());
    }

    @Test
    void testInvalidEmail() {
        // Invalid email format
        user.setEmail("invalid-email");
        Set<ConstraintViolation<User>> violations = validator.validate(user);

        assertFalse(violations.isEmpty());
        assertEquals("Email should be valid", violations.iterator().next().getMessage());
    }


    @Test
    void testNullFields() {
        // All fields null
        user.setUsername(null);
        user.setPassword(null);
        user.setEmail(null);
        Set<ConstraintViolation<User>> violations = validator.validate(user);

        assertFalse(violations.isEmpty());
        assertEquals(3, violations.size(), "All null fields should trigger validation errors");
    }

    @Test
    void testSettersAndGetters() {
        // Test all setters and getters
        user.setId("123");
        user.setUsername("newUser");
        user.setPassword("newPassword123");
        user.setEmail("new@example.com");

        assertEquals("123", user.getId());
        assertEquals("newUser", user.getUsername());
        assertEquals("newPassword123", user.getPassword());
        assertEquals("new@example.com", user.getEmail());
    }

    @Test
    void testParameterizedConstructor() {
        // Test parameterized constructor
        User newUser = new User("paramUser", "paramPassword123", "param@example.com");

        assertEquals("paramUser", newUser.getUsername());
        assertEquals("paramPassword123", newUser.getPassword());
        assertEquals("param@example.com", newUser.getEmail());
    }
}


  

