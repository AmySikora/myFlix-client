import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState(''); // State for username input
  const [password, setPassword] = useState(''); // State for password input
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const userCredentials = {
      Username: username,
      Password: password,
    };

    // Fetch request to login API endpoint
    fetch('https://movies-flix-hartung-46febebee5c5.herokuapp.com/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userCredentials), // Send the user credentials
    })
      .then(response => {
        // Check if the response is okay
        if (!response.ok) {
          setErrorMessage('Invalid username or password'); // Set error message for invalid credentials
          throw new Error('Login failed'); // Throw an error for failed login
        }
        return response.json(); // Parse the response as JSON
      })
      .then((data) => {
        // If a token is returned
        if (data.token) {
          localStorage.setItem('token', data.token); // Store the token in local storage
          localStorage.setItem('user', JSON.stringify(data.user)); // Store user info in local storage
          onLoggedIn(data.user, data.token); // Call the onLoggedIn callback
        }
      })
      .catch((error) => {
        console.error('Error during login:', error); // Log any errors
      });
  };

  return (
    <Form onSubmit={handleSubmit}> {/* Form submission triggers handleSubmit */}
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username} // Controlled input for username
          onChange={(e) => setUsername(e.target.value)} // Update username state
          required
          minLength="3" // Minimum length for username
        />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password} // Controlled input for password
          onChange={(e) => setPassword(e.target.value)} // Update password state
          required
        />
      </Form.Group>

      {errorMessage && <p className="text-danger">{errorMessage}</p>} {/* Display error message if present */}

      <Button variant="primary" type="submit"> {/* Submit button for the form */}
        Login
      </Button>
    </Form>
  );
};
