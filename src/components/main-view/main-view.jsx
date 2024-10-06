import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from '../profile-view/profile-view';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser || null);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (storedToken) {  // Check if the token exists
      fetch("https://myflixmovies123-d3669f5b95da.herokuapp.com/movies", {
        headers: {
          Authorization: `Bearer ${storedToken}` // Include the token in the header
        }
      })
        .then((response) => {
          if (!response.ok) {
            return response.text().then((text) => {
              // Handle errors as before
              throw new Error(text);
            });
          }
          return response.json();
        })
        .then((data) => {
          const moviesFromApi = data.map((movie) => ({
            ID: movie.ID,
            title: movie.Title,
            image: movie.ImageURL,
            directors: movie.Directors,
            genre: movie.Genre,
          }));
          setMovies(moviesFromApi);
        })
        .catch((error) => {
          setErrorMessage(`Error fetching movies: ${error.message}`);
          console.error('Error fetching movies:', error);
        });
    } else {
      setErrorMessage('You must be logged in to view movies.');
    }
  }, [storedToken]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={handleLogout} />
      <Row className="justify-content-md-center">
        {errorMessage && <Col className="text-danger">{errorMessage}</Col>} {/* Display error message */}
        <Routes>
          <Route
            path="/signup"
            element={
              user ? <Navigate to="/" /> : <Col md={5}><SignupView /></Col>
            }
          />
          <Route
            path="/login"
            element={
              user ? <Navigate to="/" /> : <Col md={5}><LoginView /></Col>
            }
          />
          <Route
            path="/movies/:movieID"
            element={
              !user ? <Navigate to="/login" replace /> : (
                <Col md={8}>
                  <MovieView movies={movies} />
                </Col>
              )
            }
          />
          <Route
            path="/"
            element={
              !user ? <Navigate to="/login" replace /> : (
                <>
                  {movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    movies.map((movie) => (
                      <Col className="mb-4" key={movie._id} md={3}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))
                  )}
                </>
              )
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
