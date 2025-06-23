import React, { useState, useEffect } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState(location.state?.message || '');

  useEffect(() => {
    if (errorMessage) {
      // Clear the state after showing the message to prevent it from reappearing
      const timeout = setTimeout(() => {
        setErrorMessage('');
        // Clear the state from navigation history
        navigate(location.pathname, { replace: true });
      }, 5020); // Clear after 5 seconds

      return () => clearTimeout(timeout); // Clean up the timeout
    }
  }, [errorMessage, navigate, location.pathname]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        username,
        password,
      });

      if (response.status === 200) {
        onLogin(username);
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Failed to login');
    }
  };

  return (
    <div className="login-container">

      {error && <Alert variant="danger" role="alert">{error}</Alert>}
      {errorMessage && <Alert variant="warning" role="alert">{errorMessage}</Alert>}

      <div role="form">
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" style={{ marginTop: '20px' }}>
            Login
          </Button>
        </Form>
      </div>

      <p className="mt-3" role="complementary">
        Don't have an account? <Link to="/signup" style={{color:"#0263F3"}}><strong>Sign up</strong></Link>
      </p>
    </div>
  );
};

export default Login;