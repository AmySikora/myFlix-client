import React, { useEffect, useState } from "react";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { MovieView } from "../movie-view/movie-view";
import { MoviesList } from "../movies-list/movies-list";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";
import { setUser } from "../../redux/reducers/user/user";

export const MainView = () => {
  const movies = useSelector((state) => state.movies.list);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const storedToken = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user") 
    ? JSON.parse(localStorage.getItem("user")) 
    : null;  // Ensure only valid data is parsed

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!storedToken) {
      setErrorMessage("You are not authorized. Please log in.");
      return;
    }

    fetch("https://myflixmovies123-d3669f5b95da.herokuapp.com/movies", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${storedToken}`, 
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(setMovies(data));
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setErrorMessage("Failed to fetch movies. Please try again later.");
      });
  }, [dispatch, storedToken]);

  const handleLogin = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    dispatch(setUser(data.user));
  };

  return (
    <BrowserRouter>
      <Row>
        <NavigationBar />
      </Row>
      <Row className="justify-content-md-center">
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
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
                  <LoginView onLoggedIn={handleLogin} />
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
