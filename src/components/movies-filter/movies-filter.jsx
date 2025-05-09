import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import { setFilter, resetFilter } from "../../redux/reducers/movies";
import { useNavigate } from "react-router-dom";

export const MoviesFilter = () => {
  const filter = useSelector((state) => state.movies.filter);
  const movies = useSelector((state) => state.movies.list);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Optional: Auto-redirect if 1 match is left after typing
  useEffect(() => {
    const filtered = movies.filter((movie) => {
      const searchText = filter.toLowerCase();
      return (
        movie.title.toLowerCase().includes(searchText) ||
        movie.director?.toLowerCase().includes(searchText) ||
        movie.genre?.toLowerCase().includes(searchText)
      );
    });

    if (filtered.length === 1) {
      dispatch(resetFilter());
      navigate(`/movies/${filtered[0].id}`, { state: { from: "main" } });
    }
  }, [filter, movies, dispatch, navigate]);

  return (
    <Form.Control
      type="text"
      placeholder="Search by Title, Director or Genre"
      className="search-input"
      value={filter}
      onChange={(e) => dispatch(setFilter(e.target.value))}
      aria-label="Search movies by title, director, or genre"
    />
  );
};
