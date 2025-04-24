import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export const FavoriteMovieCard = ({ movie }) => {
  const truncate = (text, maxLength) =>
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  const directorName =
    typeof movie.director === "object" ? movie.director?.Name : movie.director;

  return (
    <Link
      to={`/movies/${movie.id}`}
      state={{ from: "profile" }}
      className="text-decoration-none favorite-movie-card"
    >
      <img src={movie.image} alt={movie.title} className="favorite-movie-image" />
      <div className="favorite-movie-info">
        <h5 className="movie-title">{truncate(movie.title, 30)}</h5>
        <p className="movie-description">{truncate(movie.description, 90)}</p>
        {directorName && (
          <p className="movie-director">
            <strong>Director:</strong> {directorName}
          </p>
        )}
        <Button className="btn btn-primary mt-2">Open</Button>
      </div>
    </Link>
  );
};

FavoriteMovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
};
