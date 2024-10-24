import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
  
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        dispatch(setUser(parsedUser));
        setFavoriteMovies(parsedUser.favorite_movies || []); // Load user's favorite movies
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token is missing. Please log in.');
      return;
    }

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
        setError(error.message);
      });
  }, [dispatch]);

  const handleLogin = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user)); 
    dispatch(setUser(data.user));
    setFavoriteMovies(data.user.favorite_movies || []); // Load favorite movies on login
  };

  const onLoggedOut = () => {
    setUser(null);
    setFavoriteMovies([]); // Clear favorite movies
    localStorage.clear();
  };

  const handleFavoriteToggle = async (movieId, isFavorite) => {
    const token = localStorage.getItem("token");
    const username = user.Username;

    try {
      const headers = { Authorization: `Bearer ${token}` };

      if (isFavorite) {
        await axios.post(
          `https://myflixmovies123-d3669f5b95da.herokuapp.com/users/${username}/movies/${movieId}`,
          {},
          { headers }
        );
        setFavoriteMovies([...favoriteMovies, movieId]);
      } else {
        await axios.delete(
          `https://myflixmovies123-d3669f5b95da.herokuapp.com/users/${username}/movies/${movieId}`,
          { headers }
        );
        setFavoriteMovies(favoriteMovies.filter((id) => id !== movieId));
      }

      // Update user in localStorage
      const updatedUser = { ...user, favorite_movies: [...favoriteMovies] };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      dispatch(setUser(updatedUser)); // Update user in Redux store

    } catch (error) {
      console.error("Error updating favorite status:", error);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={onLoggedOut} />
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
          element={
            user ? (
              <MovieView
                movies={movies}
                user={user}
                favoriteMovies={favoriteMovies}
                onFavoriteToggle={handleFavoriteToggle}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/profile"
          element={
            user ? (
              <ProfileView
                user={user}
                favoriteMovies={favoriteMovies}
                onFavoriteToggle={handleFavoriteToggle}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/"
          element={user ? <MoviesList movies={movies} onFavoriteToggle={handleFavoriteToggle} /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
};
