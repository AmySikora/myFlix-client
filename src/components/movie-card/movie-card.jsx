import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  const directorName = typeof movie.director === "object" ? movie.director?.Name : movie.director;

  return (
    <Card className="h-100">
      {}
      <Link to={`/movies/${movie.id}`} className="text-decoration-none">
        <Card.Img variant="top" src={movie.image} className="w-100" />
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.description}</Card.Text>
          {directorName && <Card.Text><strong>Director:</strong> {directorName}</Card.Text>}
        </Card.Body>
        <Button variant="link">Open</Button>
        </Link>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.oneOfType([
      PropTypes.string, 
      PropTypes.shape({
        Name: PropTypes.string,
      }),
    ]),
    genre: PropTypes.string,
  }).isRequired,
};