import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import { setFilter } from "../../redux/reducers/movies";

export const MoviesFilter = () => {
  const filter = useSelector((state) => state.movies.filter);  // Get filter from Redux
  const dispatch = useDispatch();

  return (
    <Form.Control
      type="text"
      placeholder="Search movies..."
      value={filter}
      onChange={(e) => dispatch(setFilter(e.target.value))}  // Dispatch filter changes
    />
  );
};
