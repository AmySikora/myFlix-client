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
      <Card className="favorite-movie-card">
        <Card.Img
          variant="top"
          src={movie.image}
          className="favorite-movie-image"
          alt={movie.title}
        />
        <Card.Body className="d-flex flex-column justify-content-between flex-grow-1">
          <div className="flex-grow-1">
            <Card.Title className="movie-title">
              {truncate(movie.title, 30)}
            </Card.Title>
            <Card.Text className="movie-description">
              {truncate(movie.description, 100)}
            </Card.Text>
          </div>
          {directorName && (
            <Card.Text className="movie-director mt-2">
              <strong>Director:</strong> {directorName}
            </Card.Text>
          )}
          <div className="btn-favorite-card mt-3 text-center">Open</div>
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
      PropTypes.shape({
        Name: PropTypes.string,
      }),
    ]),
    genre: PropTypes.string,
  }).isRequired,
};
