import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Form from "react-bootstrap/Form";

export const MainView = () => {
  const storedUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  
  const storedToken = localStorage.getItem("token") || null;
  const [user, setUser] = useState(storedUser);
  const [token, setToken] = useState(storedToken);
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState(""); 
  const [searchBy, setSearchBy] = useState("title"); 

  useEffect(() => {
    if (!token) return;

    fetch("https://myflixmovies123-d3669f5b95da.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => ({
          id: movie._id,
          title: movie.Title,
          image: movie.ImageURL || "https://via.placeholder.com/150",
          director: movie.Director.Name || "Unknown Director", 
          genre: movie.Genre.Name || "Unknown Genre", 
          description: movie.Description || "No description available"
        }));
        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [token]);

  const handleLoggedOut = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  const filteredMovies = movies.filter((movie) => {
    if (searchBy === "title") {
      return movie.title.toLowerCase().includes(filter.toLowerCase());
    } else if (searchBy === "director") {
      return movie.director.toLowerCase().includes(filter.toLowerCase());
    } else if (searchBy === "genre") {
      return movie.genre.toLowerCase().includes(filter.toLowerCase());
    }
    return true; 
  });

  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={handleLoggedOut} />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Col md={5}>
                  <SignupView />
                </Col>
              )
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
            path="/users/:username"
            element={
              user ? (
                <ProfileView user={user} token={token} movies={movies} setUser={setUser} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              movies.length === 0 ? (
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
                  {movies.length === 0 ? (
                    <p>Loading movies...</p>
                  ) : (
                    <>
                      <Row className="justify-content-md-center">
                        <Col md={6}>
                          {}
                          <Form.Select
                            aria-label="Search by"
                            value={searchBy}
                            onChange={(e) => setSearchBy(e.target.value)}
                            className="mb-4"
                          >
                            <option value="title">Search by Title</option>
                            <option value="director">Search by Director</option>
                            <option value="genre">Search by Genre</option>
                          </Form.Select>
                          {}
                          <Form.Control
                            type="text"
                            placeholder={`Search for a movie by ${searchBy}`}
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="mb-4"
                            style={{ width: "100%", marginTop: "20px" }}
                          />
                        </Col>
                      </Row>

                      {filteredMovies.length === 0 ? (
                        <p>No movies found</p>
                      ) : (
                        <Row>
                          {filteredMovies.map((movie) => (
                            <Col className="mb-5" key={movie.id} md={3}>
                              <MovieCard movie={movie} />
                            </Col>
                          ))}
                        </Row>
                      )}
                    </>
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
