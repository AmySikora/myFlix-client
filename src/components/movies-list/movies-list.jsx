import React from "react";
import { useSelector } from "react-redux";
import { MovieCard } from "../movie-card/movie-card";
import { MoviesFilter } from "../movies-filter/movies-filter";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const MoviesList = () => {
  const movies = useSelector((state) => state.movies.list);
  const filter = useSelector((state) => state.movies.filter).trim().toLowerCase();

  const filteredMovies = movies.filter((movie) => {
    // Check if the movie title, genre, or director contains the filter value
    const titleMatch = movie.title.toLowerCase().includes(filter);
    const genreMatch = movie.genre?.toLowerCase().includes(filter); // Ensure genre exists
    const directorMatch = movie.director?.toLowerCase().includes(filter); // Ensure director exists

    return titleMatch || genreMatch || directorMatch;
  });

  return (
    <>
      <Row>
        <MoviesFilter />
      </Row>
      <Row>
        {filteredMovies.length === 0 ? (
          <Col>The list is empty!</Col>
        ) : (
          filteredMovies.map((movie) => (
            <Col className="mb-4" key={movie.id} md={3}>
              <MovieCard movie={movie} />
            </Col>
          ))
        )}
      </Row>
    </>
  );
};
