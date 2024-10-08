import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';

  const ProfileView = ({ user, token, movies, setUser }) => {
  const [username, setUsername] = useState(user.Username);
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  console.log("User object: ", user);

  useEffect(() => {
    const favoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m.id));
    setFavoriteMovies(favoriteMovies);
  }, [user, movies]);

  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedUser = {
      Username: username,
      Email: email,
      Birthday: birthday
    };


  fetch(`https://myflixmovies123-d3669f5b95da.herokuapp.com/users/${user.Username}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedUser)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to update user');
    }
    return response.json();
  })
  .then(data => {
    alert('Profile updated successfully');
    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));
  })
  .catch(err => console.error(err));
};

const handleDeregister = () => {
  fetch(`https://movies-flix-hartung-46febebee5c5.herokuapp.com/users/${user.Username}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to delete user');
    }
    alert('User deleted');
    localStorage.clear();
    window.location.reload();
  })
  .catch(err => console.error(err));
};

return (
  <Row>
    <Col md={6}>
      <h3>Profile</h3>
      <Form onSubmit={handleUpdate}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBirthday">
          <Form.Label>Birthday</Form.Label>
          <Form.Control
            type="date"
            value={birthday ? birthday.split('T')[0] : ''}
            onChange={e => setBirthday(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">Update Profile</Button>
      </Form>

      <Button variant="danger" onClick={handleDeregister} className="mt-3">Delete Account</Button>
    </Col>

    <Col md={6}>
      <h3>Favorite Movies</h3>
      <Row>
        {favoriteMovies.length === 0 ? (
          <p>You have no favorite movies yet.</p>
        ) : (
          favoriteMovies.map(movie => (
            <Col md={4} key={movie.id}>
              <MovieCard movie={movie} />
            </Col>
          ))
        )}
      </Row>
    </Col>
  </Row>
);
};