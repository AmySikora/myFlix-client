import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch("SIGNUP_URL", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        alert("Signup successful");
        window.location.reload();
      } else {
        alert("Signup failed");
      }
    });
  };

  return (
      <div className="signup-view-container"> {/* Main container class */}
        <Form onSubmit={handleSubmit} className="signup-form"> {/* Form class */}
          <h1 className="form-title">Sign up for MyFlix</h1> {/* Title class */}
  
          <Form.Group controlId="signUpFormUsername" className="form-group"> {/* Group class */}
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
  
          <Form.Group controlId="signUpFormPassword" className="form-group">
            <Form.Label className="form-label">Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
            />
          </Form.Group>
  
          <Form.Group controlId="signUpFormEmail" className="form-group"> 
            <Form.Label className="form-label">Email:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input" 
            />
          </Form.Group>
  
          <Form.Group controlId="signUpFormBirthday" className="form-group"> 
            <Form.Label className="form-label">Birthday:</Form.Label>
            <Form.Control
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
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
