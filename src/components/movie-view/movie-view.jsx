import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies, user, token, setUser }) => {
  const { movieId } = useParams(); 

  console.log("User object: ", user);

  if (!user || !user.Username) {
    console.error("User object or Username is undefined");
    return <p>User is not logged in or data is incomplete.</p>;
  }


  const movie = movies.find((b) => b.id === movieId);

  if (!movie) {
    return <p>Movie not found or loading...</p>;
  }

  console.log("Found movie: ", movie);

  const isFavorite = user?.FavoriteMovies?.includes(movieId) || false;

  const handleFavorite = () => {
    const method = isFavorite ? 'DELETE' : 'POST'; 
    fetch(`https://movies-flix-hartung-46febebee5c5.herokuapp.com/users/${user.Username}/movies/${movie.id}`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(updatedUser => {
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      })
      .catch(err => console.error('Error updating favorite movies:', err));
  };

  return (
    <div>
      <div>
        <img className="w-100" src={movie.image} alt={movie.title} />
      </div>
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
        <span>{movie.director?.Name || "Unknown Director"}</span> {}
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.genre?.Name || "Unknown Genre"}</span> {}
      </div>
      <div>
        <span>Actors: </span>
        <span>{Array.isArray(movie.actors) ? movie.actors.join(", ") : "N/A"}</span>
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