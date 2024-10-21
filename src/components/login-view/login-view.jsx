import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();  // Prevent default form submission behavior

    const data = {
      Username: username,  
      Password: password,
    };

    // Ensure both username and password are filled
    if (!username || !password) {
      setErrorMessage("Please enter both a username and password.");
      return;
    }

    fetch(`https://myflixmovies123-d3669f5b95da.herokuapp.com/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    .then(response => {
      if (!response.ok) {
        setErrorMessage('Invalid username or password');
        throw new Error('Login failed');
      }
      return response.json();
    })
    .then((data) => {
      if (data.token) {
        // Store token and user details in localStorage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // Call onLoggedIn to update the app state with user info
        onLoggedIn(data.user, data.token);
      }
    })
    .catch((e) => {
      console.error('Error during login:', e);
      setErrorMessage('Login failed. Please try again.');
    });
  };

  return (
    <div className="login-view-container">
      <Form onSubmit={handleSubmit} className="login-form">
        <Form.Group controlId="formUsername" className="form-group">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="form-group">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        {errorMessage && <p className="text-danger">{errorMessage}</p>}

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};
