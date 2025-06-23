package com.authservice.auth.controller;

import com.authservice.auth.model.User;
import com.authservice.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Handles user registration.
     * Validates input, checks for existing users, and saves the new user if all checks pass.
     */
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult bindingResult) {
        // Check for validation errors in the input
        if (bindingResult.hasErrors()) {
            // Collect field-specific error messages into a map
            Map<String, String> errors = new HashMap<>();
            for (FieldError error : bindingResult.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
            }
            // Return the validation errors as a 400 response
            return ResponseEntity.badRequest().body(errors);
        }

        // Check if the username already exists
        if (userRepository.existsByUsername(user.getUsername())) {
            Map<String, String> response = new HashMap<>();
            response.put("username", "User already exists - please log in");
            return ResponseEntity.badRequest().body(response);
        }

        // Check if the email is already in use
        if (userRepository.existsByEmail(user.getEmail())) {
            Map<String, String> response = new HashMap<>();
            response.put("email", "Email already in use - please use a different email");
            return ResponseEntity.badRequest().body(response);
        }

        // Encrypt and save the user password
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        // Return success message
        Map<String, String> successResponse = new HashMap<>();
        successResponse.put("message", "User registered successfully!");
        return ResponseEntity.ok(successResponse);
    }

    /**
     * Handles user login/authentication.
     * Verifies the provided username and password against the database.
     */
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody User user) {
        // Look for the user in the database by username
        User existingUser = userRepository.findByUsername(user.getUsername());

        // Check if the password matches
        if (existingUser != null && passwordEncoder.matches(user.getPassword(), existingUser.getPassword())) {
            // Return success message if authentication is successful
            Map<String, String> successResponse = new HashMap<>();
            successResponse.put("message", "User authenticated");
            return ResponseEntity.ok(successResponse);
        } else {
            // Return error message if authentication fails
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Invalid credentials");
            return ResponseEntity.status(401).body(errorResponse);
        }
    }
}