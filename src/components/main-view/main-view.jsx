import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card"; // Correct import
import { MovieView } from "../movie-view/movie-view";
import { SignupView } from "../signup-view/signup-view";
import { LoginView } from "../login-view/login-view"; // Ensure this import is correct

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");

  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  if (!user) {
    return (
      <>
        <LoginView
          onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
            // Save user and token to localStorage
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("token", token);
          }}
        />
        or
        <SignupView />
      </>
    );
  }

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://myflixmovies123-d3669f5b95da.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [token]);

  return (
    <div>
      {movies.length === 0 ? (
        <p>Loading movies...</p>
      ) : (
        <div className="movie-list">
          {movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onMovieClick={(selectedMovie) => setSelectedMovie(selectedMovie)}
            />
          ))}
        </div>
      )}

      {}
      {selectedMovie && <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />}
    </div>
  );
};

