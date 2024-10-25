import React, { useEffect } from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";
import { setUser } from "../../redux/reducers/user/user";
import { MoviesList } from "../movies-list/movies-list";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { MovieView } from "../movie-view/movie-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";

export const MainView = () => {
  const movies = useSelector((state) => state.movies.list);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    
    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        dispatch(setUser(parsedUser));
        fetchMovies(storedToken);
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
      }
    }
  }, [dispatch]);

  const fetchMovies = (token) => {
    fetch("https://myflixmovies123-d3669f5b95da.herokuapp.com/movies", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch movies. Status: ${response.status}`);
        }
        return response.json();
      })
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
  };

  const handleLogin = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user)); 
    dispatch(setUser(data.user));
    fetchMovies(data.token); // Fetch movies after login
  };

  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route
          path="/login"
          element={!user ? <LoginView onLoggedIn={handleLogin} /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <SignupView /> : <Navigate to="/" />}
        />
        <Route
          path="/movies/:movieId"
          element={user ? <MovieView /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={
            user ? (
              <ProfileView
                user={user}
                token={localStorage.getItem("token")}
                movies={movies}
                setUser={(updatedUser) => dispatch(setUser(updatedUser))}
        />
    ) : (
      <Navigate to="/login" />
    )
  }
/>
        <Route
          path="/"
          element={user ? <MoviesList movies={movies} /> : <Navigate to="/login" />}
        />
        {/* Fallback route for unmatched paths */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};
