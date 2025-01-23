import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MovieCard } from "../movie-card/movie-card";
import { MoviesFilter } from "../movies-filter/movies-filter";
import { resetFilter } from "../../redux/reducers/movies";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const MoviesList = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.list);
  const filter = useSelector((state) => state.movies.filter).trim().toLowerCase();

  // Filter the movies based on the filter input
  const filteredMovies = movies.filter((movie) => {
    const titleMatch = movie.title.toLowerCase().includes(filter);
    const genreMatch = movie.genre?.toLowerCase().includes(filter);
    const directorMatch = movie.director?.toLowerCase().includes(filter);

    return titleMatch || genreMatch || directorMatch;
  });

  // Reset the filter after results are fetched
  useEffect(() => {
    if (filter.length > 0 && filteredMovies.length > 0) {
      dispatch(resetFilter()); // Clear the filter text
    }
  }, [filteredMovies, filter, dispatch]);

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
