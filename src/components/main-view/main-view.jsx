import React, { useEffect } from "react";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { MovieView } from "../movie-view/movie-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";

export const MainView = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const movies = useSelector((state) => state.movies.movies);
  const user = useSelector((state) => state.user);

  const handleLoggedIn = (user) => {
    dispatch(setUser(user));
    console.log("User logged in:", user);
  };

  useEffect(() => {
    if (token) {
      fetch("https://myflixmovies123-d3669f5b95da.herokuapp.com/movies", {
        headers: {
          Authorization: `Bearer ${token}`,  
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Unauthorized");
          }
          throw new Error("Failed to fetch movies");
        }
        return response.json();
      })
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.Title,
            image: movie.ImageURL || "https://via.placeholder.com/150",
            director: movie.Director?.Name || "Unknown Director",
            description: movie.Description || "No description available",
            genre: movie.Genre?.Name || "Unknown genre",
          };
        });

        dispatch(setMovies(moviesFromApi));
      })
      .catch((error) => {
        console.error(error.message);
        alert(error.message); 
      });
    } else {
      console.log("No token found, cannot fetch movies.");
    }
  }, [dispatch, token]);

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
              <>
                {user ? (
                  <Navigate to="/" replace />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" replace />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={handleLoggedIn} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>{!user ? <Navigate to="/login" replace /> : <MoviesList />}</>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};