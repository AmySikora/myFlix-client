import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";
import { MoviesList } from "../movies-list/movies-list";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const MainView = () => {
  const movies = useSelector((state) => state.movies.list);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Retrieve token from localStorage
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      console.log("No token found, redirecting to login...");
      return;
    }

    // Fetch movies only if token exists
    fetch("https://myflixmovies123-d3669f5b95da.herokuapp.com/movies", {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },  // Pass token for authorization
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        return response.json();
      })
      .then((data) => {
        const moviesFromApi = data.map((movie) => ({
          id: movie._id,
          title: movie.Title,
          image: movie.ImageURL || "https://via.placeholder.com/150",
          director: movie.Director?.Name || "Unknown Director",
          genre: movie.Genre?.Name || "Unknown Genre",
          description: movie.Description || "No description available",
        }));

        dispatch(setMovies(moviesFromApi));  // Update the Redux store with movies
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, [dispatch, token]);

  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={handleLoggedOut} />
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
                  <LoginView />
                </Col>
              )
            }
          />
          <Route
            path="/"
            element={
              !user || !token ? (
                <Navigate to="/login" replace />
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
