import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { MovieView } from "../movie-view/movie-view";
import { MoviesList } from "../movies-list/movies-list";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { setMovies } from "../../redux/reducers/movies";
import { setUser } from "../../redux/reducers/user/user"; 

export const MainView = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const user = useSelector((state) => state.user.user);  

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
      .then((response) => response.json())
      .then((data) => {
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
                  {/* Pass handleLoggedIn as the onLoggedIn prop */}
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
