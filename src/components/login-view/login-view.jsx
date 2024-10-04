import React, { useState } from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };

    fetch("https://myflixmovies123-d3669f5b95da.herokuapp.com/", {
      method: "POST",
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.ok) {
        onLoggedIn(username);
      } else {
        alert("Login failed");
      }
    });
  };

  return (
    <div className="login-view-container"> 
    <Form onSubmit={handleSubmit} className="login-form"> 
      <h1 className="form-title">Log in to MyFlix</h1> 
      
      <Form.Group controlId="formUsername" className="form-group"> 
        <Form.Label className="form-label">Username:</Form.Label> 
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="3"
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

      <Button variant="primary" className="btn-submit mt-3" type="submit"> 
        Submit
      </Button>
    </Form>
  </div>
);
};