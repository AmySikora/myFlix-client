import React, { useState } from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from 'react-redux'; 
import { setUser } from "../../redux/reducers/user";  

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');  
  const dispatch = useDispatch(); 

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,  
      Password: password,
    };

    fetch(`https://myflixmovies123-d3669f5b95da.herokuapp.com/login`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          dispatch(setUser(data.user));  
          setErrorMessage('');  
          onLoggedIn(data); 
        });
      } else {
        setErrorMessage('Login failed. Please check your username and password.'); 
      }
    }).catch((error) => {
      setErrorMessage('An error occurred. Please try again.'); 
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

        {errorMessage && <p className="text-danger">{errorMessage}</p>}

        <Button variant="primary" className="btn-submit mt-3" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};
