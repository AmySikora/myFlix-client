import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./movie-view.scss"; 

export const MovieView = ({ movies, user, token, setUser }) => {
  const { movieId } = useParams(); 

  if (!user || !user.Username) {
    return <p>User is not logged in or data is incomplete.</p>;
  }

  const movie = movies.find((b) => b.id === movieId);
  if (!movie) {
    return <p>Movie not found</p>;
  }

  const isFavorite = user?.FavoriteMovies?.includes(movieId) || false;

  const handleFavorite = () => {
    if (!token) {
      alert("You are not authorized. Please log in again.");
      return;
    }

    const method = isFavorite ? 'DELETE' : 'POST';

    fetch(`https://myflixmovies123-d3669f5b95da.herokuapp.com/users/${user.Username}/movies/${movie.id}`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to update favorite movies");
      }
      return response.json();
    })
    .then(updatedUser => {
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    })
    .catch(err => console.error('Error updating favorite movies:', err));
  };

  return (
    <div className="movie-view-container">
      <img src={movie.image} alt={movie.title} />
      <div>
        <span>Title: </span>
        <span>{movie.title}</span>
      </div>
      <div>
        <span>Description: </span>
        <p>{movie.description}</p>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.director || "Unknown Director"}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre || "Unknown Genre"}</span>
      </div>

      <button onClick={handleFavorite} className="btn btn-primary mt-3">
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>

      <Link to="/">
        <button className="btn btn-secondary mt-3">Back</button>
      </Link>
    </div>
  );
};
