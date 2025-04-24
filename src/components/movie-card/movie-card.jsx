import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./movie-card.scss"; // if you have styles for movie card

export const MovieCard = ({ movie }) => {
  const directorName =
    typeof movie.director === "object" ? movie.director?.Name : movie.director;

  const truncate = (text, maxLength) =>
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  return (
    <Link
      to={`/movies/${movie.id}`}
      state={{ from: "main" }}
      className="favorite-movie-card text-decoration-none"
    >
      <img
        src={movie.image}
        alt={movie.title}
        className="favorite-movie-image"
      />

      <div className="favorite-movie-info">
        <h5 className="movie-title">{truncate(movie.title, 30)}</h5>
        <p className="movie-description">{truncate(movie.description, 90)}</p>
        {directorName && (
          <p className="movie-director">
            <strong>Director:</strong> {directorName}
          </p>
        )}
        <div className="btn btn-primary mt-2 w-100 text-center">Open</div>
      </div>
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
    genre: PropTypes.string,
  }).isRequired,
};
