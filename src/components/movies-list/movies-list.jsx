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
    const titleMatch = movie.title.toLowerCase().includes(filter);
    const genreMatch = movie.genre?.toLowerCase().includes(filter);
    const directorMatch = movie.director?.toLowerCase().includes(filter);
    return titleMatch || genreMatch || directorMatch;
  });

  return (
    <div className="px-3">
      <Row className="justify-content-center mb-4">
        <MoviesFilter />
      </Row>

      <Row className="justify-content-center">
  {filteredMovies.length === 0 ? (
    <Col>The list is empty!</Col>
  ) : (
    filteredMovies.map((movie) => (
      <Col key={movie.id} xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center mb-4">
        <MovieCard movie={movie} />
      </Col>
    ))
  )}
</Row>
    </div>
  );
};
