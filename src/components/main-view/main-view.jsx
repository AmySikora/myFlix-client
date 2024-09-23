import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card"; // Correct import
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://myflixmovies123-d3669f5b95da.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        data.forEach((movie) => {
          if (!movie.ImageURL) {
            console.warn(`Movie with ID ${movie._id} is missing ImageURL`);
          }
        });
        const moviesFromApi = data.map((movie) => ({
          id: movie._id,
          Title: movie.Title,
          Genre: movie.Genre,
          ImageURL: movie.ImageURL,
          Description: movie.Description,
          Director: movie.Director,
        }));
        setMovies(moviesFromApi);
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);
  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard movie={movie}
          key={movie.id} // Ensure id is passed correctly
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
