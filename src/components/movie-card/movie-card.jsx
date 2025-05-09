import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

/**
 * Truncate long text with ellipsis
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
const truncate = (text, maxLength) =>
  text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

export const MovieCard = ({ movie }) => {
  const directorName =
    typeof movie.director === "object" ? movie.director?.Name : movie.director;

  return (
    <Card className="movie-card d-flex flex-column">
      <Link to={`/movies/${movie.id}`} state={{ from: "main" }}>
        <Card.Img
          variant="top"
          src={movie.image}
          alt={`${movie.title} movie poster`}
          className="movie-img"
        />
      </Link>
      <Card.Body className="d-flex flex-column flex-grow-1">
        <div className="flex-grow-1">
          <Card.Title className="movie-title">
            {truncate(movie.title, 40)}
          </Card.Title>
          <Card.Text className="movie-description">
            {truncate(movie.description, 150)}
          </Card.Text>
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
          aria-label={`Open ${movie.title} details`}
        >
          Open
        </Button>
      </Card.Body>
    </Card>
  );
};
