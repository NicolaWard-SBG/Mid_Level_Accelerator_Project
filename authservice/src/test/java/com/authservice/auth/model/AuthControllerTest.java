package com.authservice.auth.controller;

import com.authservice.auth.controller.AuthController;
import com.authservice.auth.model.User;
import com.authservice.auth.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(AuthController.class)
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserRepository userRepository;

    @MockBean
    private PasswordEncoder passwordEncoder;

    @Test
    void testRegisterUser_Success() throws Exception {
        // Mock repository and encoder behavior
        when(userRepository.existsByUsername("testuser")).thenReturn(false);
        when(userRepository.existsByEmail("testuser@example.com")).thenReturn(false);
        when(passwordEncoder.encode("password123")).thenReturn("encodedPassword");

        // Valid user JSON
        String validUserJson = "{\n" +
                "  \"username\": \"testuser\",\n" +
                "  \"password\": \"password123\",\n" +
                "  \"email\": \"testuser@example.com\"\n" +
                "}";

        mockMvc.perform(post("/api/auth/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(validUserJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("User registered successfully!"));

        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    void testRegisterUser_UsernameAlreadyExists() throws Exception {
        // Mock repository behavior
        when(userRepository.existsByUsername("existinguser")).thenReturn(true);

        // JSON with existing username
        String userJson = "{\n" +
                "  \"username\": \"existinguser\",\n" +
                "  \"password\": \"password123\",\n" +
                "  \"email\": \"user@example.com\"\n" +
                "}";

        mockMvc.perform(post("/api/auth/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(userJson))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.username").value("User already exists - please log in"));

        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void testRegisterUser_EmailAlreadyExists() throws Exception {
        // Mock repository behavior
        when(userRepository.existsByEmail("existing@example.com")).thenReturn(true);

        // JSON with existing email
        String userJson = "{\n" +
                "  \"username\": \"newuser\",\n" +
                "  \"password\": \"password123\",\n" +
                "  \"email\": \"existing@example.com\"\n" +
                "}";

        mockMvc.perform(post("/api/auth/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(userJson))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.email").value("Email already in use - please use a different email"));

        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    void testAuthenticateUser_Success() throws Exception {
        // Mock repository and encoder behavior
        User existingUser = new User("testuser", "encodedPassword", "testuser@example.com");
        when(userRepository.findByUsername("testuser")).thenReturn(existingUser);
        when(passwordEncoder.matches("password123", "encodedPassword")).thenReturn(true);

        // Valid login JSON
        String loginJson = "{\n" +
                "  \"username\": \"testuser\",\n" +
                "  \"password\": \"password123\"\n" +
                "}";

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(loginJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("User authenticated"));
    }

    @Test
    void testAuthenticateUser_InvalidCredentials() throws Exception {
        // Mock repository behavior
        User existingUser = new User("testuser", "encodedPassword", "testuser@example.com");
        when(userRepository.findByUsername("testuser")).thenReturn(existingUser);
        when(passwordEncoder.matches("wrongpassword", "encodedPassword")).thenReturn(false);

        // Invalid login JSON
        String loginJson = "{\n" +
                "  \"username\": \"testuser\",\n" +
                "  \"password\": \"wrongpassword\"\n" +
                "}";

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(loginJson))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.error").value("Invalid credentials"));
    }

    @Test
    void testAuthenticateUser_UserNotFound() throws Exception {
        // Mock repository behavior
        when(userRepository.findByUsername("nonexistentuser")).thenReturn(null);

        // JSON with nonexistent username
        String loginJson = "{\n" +
                "  \"username\": \"nonexistentuser\",\n" +
                "  \"password\": \"password123\"\n" +
                "}";

        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(loginJson))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.error").value("Invalid credentials"));
    }
}
