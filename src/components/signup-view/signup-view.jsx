import React, { useState } from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const SignupView = ({ onSignedUp }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const newUser = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };
  
    fetch('https://myflixmovies123-d3669f5b95da.herokuapp.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
    .then((response) => {
      // Log the raw response for debugging
      return response.text().then(text => {
        console.log("Response text:", text); // Log the response text
        if (!response.ok) {
          throw new Error(text); // Throw the raw response text if not okay
        }
        return JSON.parse(text); // Try to parse the response as JSON
      });
    })
    .then((data) => {
      alert('User created successfully');
      // Handle successful signup
    })
    .catch((error) => {
      console.error('Error:', error);
      alert(error.message);
    });
  };
  
  return (
    <div className="signup-view-container">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername" className="form-group">
          <Form.Label className="form-label">Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="3"
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="form-group">
          <Form.Label className="form-label">Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEmail" className="form-group">
          <Form.Label className="form-label">Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBirthday" className="form-group">
          <Form.Label className="form-label">Birthday:</Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
        </Form.Group>

        {errorMessage && <div className="text-danger">{errorMessage}</div>}

        <Button variant="primary" className="btn-submit mt-3" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
