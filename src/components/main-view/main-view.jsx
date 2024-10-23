import React, { useEffect } from "react";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { MovieView } from "../movie-view/movie-view";
import { ProfileView } from "../profile-view/profile-view"; 
import { NavigationBar } from "../navigation-bar/navigation-bar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";
import { setUser } from "../../redux/reducers/user/user";
import { MoviesList } from "../movies-list/movies-list";

export const MainView = () => {
  const movies = useSelector((state) => state.movies.list);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  // Load user and token from localStorage and add debug logs
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    console.log("Stored user:", storedUser); // Debugging log
    console.log("Stored token:", storedToken); // Debugging log

    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("Parsed user:", parsedUser); // Debugging log

        if (parsedUser && parsedUser.Username) {
          dispatch(setUser(parsedUser)); // Set user in Redux
        } else {
          console.error("Parsed user is invalid.");
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
  }, [dispatch]);

  // Fetch movies from API if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token is missing. Please log in.");
      return;
    }

    console.log("Fetching movies with token:", token); // Debugging log

    fetch("https://myflixmovies123-d3669f5b95da.herokuapp.com/movies", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (response.status === 401) {
          console.error("Unauthorized. Clearing token and user.");
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          dispatch(setUser(null)); // Clear user in Redux
          throw new Error("Unauthorized. Please log in again.");
        }

        if (!response.ok) {
          throw new Error(`Failed to fetch movies. Status: ${response.status}`);
        }

        return response.json();
      })
      .then((data) => {
        console.log("Fetched movies data:", data); // Debugging log

        const moviesFromApi = data.map((movie) => ({
          id: movie._id,
          title: movie.Title,
          image: movie.ImageURL || "https://via.placeholder.com/150",
          director: movie.Director?.Name || "Unknown Director",
          description: movie.Description || "No description available",
          genre: movie.Genre?.Name || "Unknown genre",
        }));

        dispatch(setMovies(moviesFromApi));
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [dispatch]);

  const handleLogin = (data) => {
    console.log("Login successful, storing user and token."); // Debugging log
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user)); // Store user in localStorage
    dispatch(setUser(data.user));
  };

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
            path="/profile"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <Col md={8}>
                  <ProfileView />
                </Col>
              )
            }
          />
          <Route
            path="/"
            element={
              !user ? <Navigate to="/login" replace /> : <MoviesList />
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
