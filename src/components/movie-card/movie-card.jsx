import React from 'react';
import PropTypes from 'prop-types';

export const MovieCard = ({ movie, onMovieClick }) => {
  const imageURL = movie.ImageURL || 'default_image_url_here'; // Provide a fallback URL

  return (
    <div onClick={() => onMovieClick(movie)}>
      <img src={imageURL} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    ImageURL: PropTypes.string, // No longer required
    Title: PropTypes.string,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
