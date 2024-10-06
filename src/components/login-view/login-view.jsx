import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('https://your-api-url/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        // Check if the response is OK (status code 200-299)
        if (!response.ok) {
          return response.text().then((text) => {
            // Handle error messages sent as plain text
            throw new Error(text);
          });
        }
        return response.json(); // Otherwise, parse the response as JSON
      })
      .then((data) => {
        if (data.token) {
          // Call the onLoggedIn function with user data and token
          onLoggedIn(data.user, data.token);
        } else {
          setErrorMessage('Login failed: Invalid response from server.');
        }
      })
      .catch((error) => {
        setErrorMessage(`Login failed: ${error.message}`);
        console.error('Error during login:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit">Login</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </form>
  );
};

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};
