import React from "react";;
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

export const MovieCard = ({ movie }) => {
  const directorName =
    typeof movie.director === "object" ? movie.director?.Name : movie.director;

  const truncate = (text, maxLength) =>
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  return (
    <Card className="movie-card d-flex flex-column">
      <Link to={`/movies/${movie.id}`} state={{ from: "main" }}>
        <Card.Img variant="top" src={movie.image} className="movie-img" />
      </Link>
      <Card.Body className="d-flex flex-column flex-grow-1">
        <div className="flex-grow-1">
          <Card.Title className="movie-title">{truncate(movie.title, 40)}</Card.Title>
          <Card.Text className="movie-description">{truncate(movie.description, 150)}</Card.Text>
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
  );
};
