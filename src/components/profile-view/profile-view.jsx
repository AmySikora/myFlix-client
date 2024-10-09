import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form, Row, Col, Card } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';

export const ProfileView = ({ user, token, movies, setUser }) => {
  const { username } = useParams();
  const navigate = useNavigate(); 

  const [userUsername, setUserUsername] = useState(user.Username || "");
  const [email, setEmail] = useState(user.Email || "");
  const [birthday, setBirthday] = useState(user.Birthday ? user.Birthday.split("T")[0] : "");
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    if (user && movies && user.FavoriteMovies) {
      const favoriteMoviesList = movies.filter(m => user.FavoriteMovies.includes(m.id));
      setFavoriteMovies(favoriteMoviesList);
    }
  }, [user, movies]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedUser = {
      Username: userUsername,
      Email: email,
      Birthday: birthday,
    };

    fetch(`https://myflixmovies123-d3669f5b95da.herokuapp.com/users/${username}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    })
    .then(response => response.json())
    .then(data => {
      alert('Profile updated successfully');
      setUser(data); 
      localStorage.setItem('user', JSON.stringify(data)); 
    })
    .catch(err => console.error('Error updating profile:', err));
  };

  const handleDeregister = () => {
    fetch(`https://myflixmovies123-d3669f5b95da.herokuapp.com/users/${username}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => {
      if (response.ok) {
        alert('User deleted');
        localStorage.clear(); 
        navigate('/login'); 
      } else {
        alert('Failed to delete user');
      }
    })
    .catch(err => console.error('Error deleting user:', err));
  };

  return (
    <Row>
      <Col md={6}>
        <h3>User Profile</h3>
        <Form onSubmit={handleUpdate}>
          <Form.Group controlId="formUsername" className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={userUsername}
              onChange={e => setUserUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBirthday" className="mb-3">
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              type="date"
              value={birthday}
              onChange={e => setBirthday(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Update Profile
          </Button>
        </Form>

        <Button variant="danger" onClick={handleDeregister} className="mt-3">
          Delete Account
        </Button>
      </Col>

      <Col md={6}>
        <h3>Favorite Movies</h3>
        {favoriteMovies.length === 0 ? (
          <p>No favorite movies added yet.</p>
        ) : (
          <Row>
            {favoriteMovies.map((movie) => (
              <Col key={movie.id} md={4} className="mb-4">
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
        )}
      </Col>
    </Row>
  );
};
