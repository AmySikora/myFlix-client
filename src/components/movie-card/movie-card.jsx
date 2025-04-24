import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  const directorName =
    typeof movie.director === "object" ? movie.director?.Name : movie.director;

  const truncate = (text, maxLength) =>
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  return (
    <Card className="movie-card-container h-100 d-flex flex-column justify-content-between">
      <Link to={`/movies/${movie.id}`} className="text-decoration-none" state={{ from: "main" }}>
        <Card.Img variant="top" src={movie.image} className="card-img-top" />
        <Card.Body className="card-body">
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text className="card-description">{truncate(movie.description, 180)}</Card.Text>
        </Card.Body>
      </Link>

      <div className="card-footer mt-auto p-3">
        {directorName && (
          <div className="card-director mb-2">
            <strong>Director:</strong> {directorName}
          </div>
        )}
        <Button as={Link} to={`/movies/${movie.id}`} state={{ from: "main" }} className="btn">
          Open
        </Button>
      </div>
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
