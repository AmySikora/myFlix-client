import React, { useState } from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const SignupView = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Name: name,
      Username: username,
      Password: password,
      Birthday: birthday,
    };

    // Fetch call for signup logic here...
  };

  return (
    <div className="signup-view-container">
      <Form onSubmit={handleSubmit}>
        <h1 className="form-title">Sign Up for MyFlix</h1>

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

        <Form.Group controlId="formName" className="form-group">
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

        <Button variant="primary" className="btn-submit mt-3" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
