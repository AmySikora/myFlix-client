import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  const directorName = typeof movie.director === "object" ? movie.director?.Name : movie.director;

  return (
    <Card className="movie-card-container h-100">
      <Link to={`/movies/${movie.id}`} className="text-decoration-none">
        <Card.Img variant="top" src={movie.image} className="card-img-top" />
        <Card.Body className="card-body">
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text>{movie.description}</Card.Text>
          {directorName && <Card.Text><strong>Director:</strong> {directorName}</Card.Text>}
        </Card.Body>
      </Link>
      
      <Button as={Link} to={`/movies/${movie.id}`} className="btn mt-2">
        Open
      </Button>
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
