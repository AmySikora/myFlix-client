// ProfileView.jsx
import React, { useEffect, useState } from 'react';
import { Row, Column, Button, Form } from 'react-bootstrap';
import { MovieCard } from './MovieCard';

export const ProfileView = ({ user, movies, setUser }) => {
  const [username, setUsername] = useState(user.Username);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [mail, setEmail] = useState(user.Username);
  const [birthday, setBirthday] = useState(user.setBirthday)

  console.log("User object: ", user);

  useEffect(() => {
    // Fetch user info from API
    fetch(`https://myflixmovies123-d3669f5b95da.herokuapp.com/users/${user.Username}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserInfo(data);
        setUpdatedInfo(data);
        // Filter favorite movies
        const favoriteMovies = movies.filter(m => data.FavoriteMovies.includes(m._id));
        setFavoriteMovies(favoriteMovies);
      });
  }, [user.Username]);

  const handleUpdate = (e) => {
    e.preventDefault();
    // Send updated user info to API
    fetch(`https://myflixmovies123-d3669f5b95da.herokuapp.com/users/${user.Username}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(updatedInfo),
    })
      .then((response) => response.json())
      .then((data) => {
        setUserInfo(data);
        alert('User info updated successfully');
      })
      .catch((error) => console.error('Error updating user info:', error));
  };

  const handleDeregister = () => {
    fetch(`https://myflixmovies123-d3669f5b95da.herokuapp.com/users/${user.Username}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(() => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        onLoggedOut();
      })
      .catch((error) => console.error('Error deregistering user:', error));
  };

  return (
    <Container>
      <h2>Your Profile</h2>
      <Form onSubmit={handleUpdate}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={updatedInfo.Username}
            onChange={(e) => setUpdatedInfo({ ...updatedInfo, Username: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={updatedInfo.Email}
            onChange={(e) => setUpdatedInfo({ ...updatedInfo, Email: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Leave blank to keep current password"
            onChange={(e) => setUpdatedInfo({ ...updatedInfo, Password: e.target.value })}
          />
        </Form.Group>
        <Button variant="primary" type="submit">Update Profile</Button>
      </Form>
      <Button variant="danger" onClick={handleDeregister}>Deregister</Button>

      <h3>Your Favorite Movies</h3>
      <div className="movie-cards">
        {favoriteMovies.map(movie => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </Container>
  );
};
