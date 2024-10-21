import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";
import { setUser } from "../../redux/reducers/user/user.js";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { MovieView } from "../movie-view/movie-view";
import { MoviesList } from "../movies-list/movies-list";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { createSelector } from 'reselect';

// Memoized movies selector
const selectMovies = createSelector(
  (state) => state.movies.list,
  (movies) => movies || []
);

export const MainView = () => {
  const movies = useSelector(selectMovies);  // Use memoized selector
  const user = useSelector((state) => state.user?.user);
  const dispatch = useDispatch();

  const handleLoggedIn = (user) => {
    dispatch(setUser(user));
    console.log("User logged in:", user);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      console.error("No token found, redirecting to login...");
      return;
    }
  
    fetch("https://myflixmovies123-d3669f5b95da.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Movies fetched from API:", data);  // Log the movie data to verify it's fetched
        const moviesFromApi = data.map((movie) => ({
          id: movie._id,
          title: movie.Title,
          image: movie.ImageURL || "https://via.placeholder.com/150",
          director: movie.Director?.Name || "Unknown Director",
          genre: movie.Genre?.Name || "Unknown genre",
          description: movie.Description || "No description available",
        }));
  
        dispatch(setMovies(moviesFromApi));  // Dispatch the fetched movies
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [dispatch]);
  
  return (
    <BrowserRouter>
      <Row>
        <NavigationBar />
      </Row>
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              user ? (
                <Navigate to="/" replace />
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
                <Navigate to="/" replace />
              ) : (
                <Col md={5}>
                  <LoginView onLoggedIn={handleLoggedIn} />
                </Col>
              )
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : movies.length === 0 ? (
                <Col>The list is empty!</Col>
              ) : (
                <Col md={8}>
                  <MovieView />
                </Col>
              )
            }
          />
          <Route
            path="/"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : movies.length === 0 ? (
                <Col>No movies available</Col>
              ) : (
                <MoviesList />
              )
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
