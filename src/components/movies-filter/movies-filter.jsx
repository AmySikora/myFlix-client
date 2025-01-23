import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Form from "react-bootstrap/Form";
import { setFilter, resetFilter } from "../../redux/reducers/movies";

export const MoviesFilter = () => {
  const filter = useSelector((state) => state.movies.filter);
  const dispatch = useDispatch();

  const handleClearFilter = () => {
    dispatch(resetFilter()); 
  };

  return (
    <Form.Control
      type="text"
      placeholder="Search by Title, Director or Genre"
      className="form-control"
      value={filter}
      onChange={(e) => dispatch(setFilter(e.target.value))}
      onBlur={handleClearFilter} 
    />
  );
};
