import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (!token) return;

    fetch("https://myflixmovies123-d3669f5b95da.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const movieList = data.map((movie) => ({
          id: movie._id,
          title: movie.Title,
          image: movie.ImageURL || "https://via.placeholder.com/150",
          directors: movie.Directors,
          genre: movie.Genre,
          description: movie.Description,
        }));
        setMovies(movieList);
      })
      .catch((error) => console.error("Failed to fetch movies:", error));
  }, [token]);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={handleLogout} />
      <Row className="justify-content-md-center">
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
              user ? (
                <Navigate to="/" />
              ) : (
                <Col md={5}>
                  <LoginView
                    onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);
                      localStorage.setItem("user", JSON.stringify(user));
                      localStorage.setItem("token", token);
                    }}
                  />
                </Col>
              )
            }
          />
          <Route
            path="/profile"
            element={
              user ? (
                <Col md={8}>
                  <ProfileView
                    user={user}
                    token={token}
                    movies={movies}
                    setUser={setUser}
                  />
                </Col>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              !movies.length ? (
                <p>Loading movies...</p>
              ) : (
                <Col md={8}>
                  <MovieView
                    movies={movies}
                    user={user}
                    token={token}
                    setUser={setUser}
                  />
                </Col>
              )
            }
          />
          <Route
            path="/"
            element={
              user ? (
                <>
                  <Row className="justify-content-md-center">
                    <Col md={6}>
                      <Form.Control
                        type="text"
                        placeholder="Search for a movie"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="mb-4"
                      />
                    </Col>
                  </Row>
                  {filteredMovies.length ? (
                    <Row>
                      {filteredMovies.map((movie) => (
                        <Col key={movie.id} md={3} className="mb-4">
                          <MovieCard movie={movie} />
                        </Col>
                      ))}
                    </Row>
                  ) : (
                    <p>No matching movies found</p>
                  )}
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
