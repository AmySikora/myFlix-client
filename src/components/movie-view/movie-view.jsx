import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Card, Row } from "react-bootstrap";
import './movie-view.scss';


export const MovieView = ({ movies, user, token, setUser }) => {
  const { MovieID } = useParams();
  const [isFavorite, setIsFavorite] = useState(flase);
  const movie = movies.find((b) => b.id === MovieID);

  useEffect(() => {
    id(user && user.FavoriteMovies) {
      const isFavorite = user.FavoriteMovies.includes(movieID)
      setIsFavorite(isFavorite);
    }
  }, [movieId, user ]
);



  return (
    <div>
      <div>
        <img src={imageURL} alt={`${movie.Title} poster`} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director.Name}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre.Name}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }).isRequired,
    ImageURL: PropTypes.string,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
