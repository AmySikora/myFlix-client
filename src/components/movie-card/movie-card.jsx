import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {
  const directorName =
    typeof movie.director === "object" ? movie.director?.Name : movie.director;

  const truncate = (text, maxLength) =>
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  return (
    <div className="favorite-movie-card"> {/* reuse the same styling class */}
      <img src={movie.image} alt={movie.title} className="favorite-movie-image" />

      <div className="favorite-movie-info">
        <h5 className="movie-title">{truncate(movie.title, 30)}</h5>
        <p className="movie-description">{truncate(movie.description, 90)}</p>
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
    </div>
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
    genre: PropTypes.string,
  }).isRequired,
};
