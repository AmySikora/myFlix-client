import React, { useState } from "react";

export const SignupView = ({ onSignedUp }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch("https://myflixmovies123-d3669f5b95da.herokuapp.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Signup failed");
        }
      })
      .then((user) => {
        alert("Signup successful! Please login.");
        onSignedUp(); // Navigate the user after successful signup
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <form onSubmit={handleSignup}>
      <h2>Sign Up</h2>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <input 
        type="text" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        placeholder="Username" 
        required 
      />
      <input 
        type="password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password" 
        required 
      />
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        placeholder="Email" 
        required 
      />
      <input 
        type="date" 
        value={birthday} 
        onChange={(e) => setBirthday(e.target.value)} 
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};
