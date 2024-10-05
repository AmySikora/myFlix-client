import React, { useState, useEffect } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';

export const ProfileView = ({ user, token, movies, setUser }) => {
  const [formData, setFormData] = useState({
    username: user.Username,
    email: user.Email,
    birthday: user.Birthday
  });
  const [favoriteMoviesList, setFavoriteMoviesList] = useState([]);

  useEffect(() => {
    const favorites = movies.filter(movie => user.FavoriteMovies.includes(movie.id));
    setFavoriteMoviesList(favorites);
  }, [user, movies]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    
    const updatedUser = {
      Username: formData.username,
      Email: formData.email,
      Birthday: formData.birthday
    };

    try {
      const response = await fetch(`https://myflixmovies123-d3669f5b95da.herokuapp.com/users/${user.Username}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
      });

      if (!response.ok) throw new Error('Update failed');
      const data = await response.json();
      alert('Profile updated successfully');
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAccountDeletion = async () => {
    try {
      const response = await fetch(`https://myflixmovies123-d3669f5b95da.herokuapp.com/users/${user.Username}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!response.ok) throw new Error('Account deletion failed');
      alert('Account successfully deleted');
      localStorage.clear();
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Row>
      <Col md={6}>
        <h2>User Profile</h2>
        <Form onSubmit={handleProfileUpdate}>
          <Form.Group controlId="usernameInput">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="emailInput">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="birthdayInput">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="birthday"
              value={formData.birthday ? formData.birthday.split('T')[0] : ''}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Button variant="success" type="submit">Update</Button>
        </Form>

        <Button variant="danger" onClick={handleAccountDeletion} className="mt-3">Delete Account</Button>
      </Col>

      <Col md={6}>
        <h2>Your Favorite Movies</h2>
        <Row>
          {favoriteMoviesList.length === 0 ? (
            <p>No favorite movies found.</p>
          ) : (
            favoriteMoviesList.map(movie => (
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
