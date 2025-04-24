import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss"; // make sure this is included

export const MovieCard = ({ movie }) => {
  const directorName = typeof movie.director === "object" ? movie.director?.Name : movie.director;

  const truncate = (text, maxLength) =>
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  return (
    <Card className="favorite-movie-card">
      <Link to={`/movies/${movie.id}`} className="text-decoration-none" state={{ from: "main" }}>
        <Card.Img variant="top" src={movie.image} className="favorite-movie-image" />
      </Link>

      <div className="favorite-movie-info d-flex flex-column justify-content-between flex-grow-1">
        <div>
          <h5 className="movie-title">{truncate(movie.title, 30)}</h5>
          <p className="movie-description">{truncate(movie.description, 100)}</p>
        </div>
        {directorName && (
          <p className="movie-director">
            <strong>Director:</strong> {directorName}
          </p>
        )}
        <Button
          as={Link}
          to={`/movies/${movie.id}`}
          state={{ from: "main" }}
          className="btn btn-primary mt-2"
        >
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
