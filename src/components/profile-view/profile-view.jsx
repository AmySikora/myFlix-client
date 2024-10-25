import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';

export const ProfileView = ({ user, token, movies = [], setUser }) => {
  const navigate = useNavigate();

  const [userUsername, setUserUsername] = useState(user?.Username || "");
  const [email, setEmail] = useState(user?.Email || "");
  const [birthday, setBirthday] = useState(user?.Birthday ? user.Birthday.split("T")[0] : "");
  const [password, setPassword] = useState("");
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    if (user && Array.isArray(movies) && movies.length > 0 && user.FavoriteMovies) {
      const favoriteMoviesList = movies.filter(movie => 
        user.FavoriteMovies.includes(movie.id) 
      );
      setFavoriteMovies(favoriteMoviesList);
    }
  }, [user, movies]);
  
  const handleUpdate = (e) => {
    e.preventDefault();

    if (!password) {
      alert("Please enter your password to update your profile");
      return;
    }

    const updatedUser = {
      Username: userUsername,
      Email: email,
      Birthday: birthday,
      Password: password,
    };

    fetch(`https://myflixmovies123-d3669f5b95da.herokuapp.com/users/${user.Username}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Update failed: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      alert('Your profile was updated');
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
    })
    .catch(err => console.error('Error updating profile:', err));
  };

  const handleDeregister = () => {
    fetch(`https://myflixmovies123-d3669f5b95da.herokuapp.com/users/${user.Username}`, {
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
    <div className="profile-view-container">
      <Row>
        <Col md={6}>
          <h3>User Profile</h3>
          <Form onSubmit={handleUpdate}>
            <Form.Group controlId="formUsername" className="form-group">
              <Form.Label className="form-label">Username</Form.Label>
              <Form.Control
                type="text"
                value={userUsername}
                onChange={e => setUserUsername(e.target.value)}
                required
                className="form-input"
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="form-group">
              <Form.Label className="form-label">Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="form-input"
              />
            </Form.Group>

            <Form.Group controlId="formBirthday" className="form-group">
              <Form.Label className="form-label">Birthday</Form.Label>
              <Form.Control
                type="date"
                value={birthday}
                onChange={e => setBirthday(e.target.value)}
                className="form-input"
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="form-group">
              <Form.Label className="form-label">Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your current password"
                required
                className="form-input"
              />
              <Form.Text className="text-muted">
                Please enter your password to update your profile
              </Form.Text>
            </Form.Group>

            <Button className="btn-submit" type="submit">Update Profile</Button>
          </Form>

          <Button className="btn-danger mt-3" onClick={handleDeregister}>Delete Account</Button>
        </Col>

        <Col md={6}>
          <h3>Favorite Movies</h3>
          {favoriteMovies.length === 0 ? (
            <p>No favorite movies added yet.</p>
          ) : (
            <Row>
              {favoriteMovies.map((movie) => (
                <Col key={movie._id} md={4} className="mb-4">
                  <MovieCard movie={movie} />
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </div>
  );
};
