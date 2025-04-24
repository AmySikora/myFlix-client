import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

export const MovieCard = ({ movie }) => {
  const directorName =
    typeof movie.director === "object" ? movie.director?.Name : movie.director;

  const truncate = (text, maxLength) =>
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  return (
    <Link
      to={`/movies/${movie.id}`}
      state={{ from: "main" }}
      className="movie-card-link"
    >
      <Card className="movie-card d-flex flex-column">
  <Link to={`/movies/${movie.id}`} state={{ from: "main" }} className="movie-card-link">
    <Card.Img variant="top" src={movie.image} className="movie-img" />
  </Link>

  <Card.Body className="d-flex flex-column justify-content-between flex-grow-1">
    <div className="mb-2">
      <Card.Title className="movie-title">{truncate(movie.title, 30)}</Card.Title>
      <Card.Text className="movie-description">{truncate(movie.description, 100)}</Card.Text>
      {directorName && (
        <Card.Text className="movie-director">
          <strong>Director:</strong> {directorName}
        </Card.Text>
      )}
    </div>

    <Button
      as={Link}
      to={`/movies/${movie.id}`}
      state={{ from: "main" }}
      className="btn-open mt-auto"
    >
      Open
    </Button>
  </Card.Body>
</Card>
    </Link>
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
      PropTypes.shape({ Name: PropTypes.string }),
    ]),
  }).isRequired,
};
