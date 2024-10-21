import React from "react";
import { useSelector } from "react-redux";
import { MovieCard } from "../movie-card/movie-card";  // Ensure you have this component
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const MoviesList = () => {
  const movies = useSelector((state) => state.movies.movies);  // Get movies from Redux
  const filter = useSelector((state) => state.movies.filter);  // Get filter from Redux

  // Filter movies based on the search filter
  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(filter.toLowerCase())  // Case insensitive search
  );

  if (!movies || movies.length === 0) {
    return <div>No movies available</div>;
  }

  return (
    <Row>
      {filteredMovies.map((movie) => (
        <Col md={3} key={movie.id}>
          <MovieCard movie={movie} />
        </Col>
      ))}
    </Row>
  );
};
