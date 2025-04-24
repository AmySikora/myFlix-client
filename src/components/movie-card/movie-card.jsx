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
        <Card.Img variant="top" src={movie.image} className="favorite-movie-image" />
        <Card.Body className="d-flex flex-column justify-content-between">
          <div>
            <Card.Title className="movie-title">{truncate(movie.title, 30)}</Card.Title>
            <Card.Text className="movie-description">
              {truncate(movie.description, 100)}
            </Card.Text>
          </div>
          {directorName && (
            <Card.Text className="movie-director">
              <strong>Director:</strong> {directorName}
            </Card.Text>
          )}
          <div className="btn btn-primary mt-2 w-100">Open</div>
        </Card.Body>
      </Card>
    </Link>
  );
};
