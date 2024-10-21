import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";
import { setUser } from "../../redux/reducers/user/user.js";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MoviesFilter } from "../movies-filter/movies-filter";
import { MoviesList } from "../movies-list/movies-list";
import { MovieView } from "../movie-view/movie-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { SignupView } from "../signup-view/signup-view";
import { LoginView } from "../login-view/login-view";
import { ProfileView } from "../profile-view/profile-view";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const MainView = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.movies);
  const user = useSelector((state) => state.user?.user);
  const token = localStorage.getItem("token");

  useEffect(() => {
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
        const moviesFromApi = data.map((movie) => ({
          id: movie._id,
          title: movie.Title,
          image: movie.ImageURL || "https://via.placeholder.com/150",
          director: movie.Director?.Name || "Unknown Director",
          genre: movie.Genre?.Name || "Unknown genre",
          description: movie.Description || "No description available",
        }));

        dispatch(setMovies(moviesFromApi));
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [dispatch, token]);

  const updateUser = (updatedUser) => {
    dispatch(setUser(updatedUser));
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <BrowserRouter>
      <NavigationBar />
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
                  <LoginView onLoggedIn={updateUser} />
                </Col>
              )
            }
          />
          <Route
              path="/profile"
                element={
              !user ? <Navigate to="/login" replace /> : <ProfileView user={user} token={token} movies={movies} setUser={setUser} />
              }
            />
          <Route
            path="/movies/:movieId"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <Col md={8}>
                  <MovieView movies={movies} user={user} token={token} setUser={updateUser} />
                </Col>
              )
            }
          />
          <Route
            path="/"
            element={
              !user ? (
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
