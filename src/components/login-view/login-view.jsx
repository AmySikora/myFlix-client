import React, { useState } from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');  // Add state for error message

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };

    fetch('https://myflixmovies123-d3669f5b95da.herokuapp.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Login failed. Please check your credentials.');
      }
      return response.json();
    })
    .then((data) => {
      if (data.token) {
        localStorage.setItem('token', data.token);  // Store the token
        localStorage.setItem('user', JSON.stringify(data.user));  // Optionally store user data

        // Call the onLoggedIn function if it exists
        if (typeof onLoggedIn === 'function') {
          onLoggedIn(data.user);
        } else {
          console.error("onLoggedIn is not a function");
        }
      } else {
        setErrorMessage('Login failed. Please check your credentials.');
      }
    })
    .catch((error) => {
      console.error('Login failed:', error.message);
      setErrorMessage(error.message);  // Set the error message if login fails
    });
  };

  return (
    <div className="login-view-container">
      <Form onSubmit={handleSubmit} className="login-form">
        <Form.Group controlId="formUsername" className="form-group">
          <Form.Label className="form-label">Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="form-input"
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="form-group">
          <Form.Label className="form-label">Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
          />
        </Form.Group>

        {errorMessage && <p className="error-message">{errorMessage}</p>}  {/* Display error message */}

        <Button variant="primary" className="btn-submit mt-3" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
