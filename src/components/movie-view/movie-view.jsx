import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({ movies, user, token, setUser }) => {
  const { MovieID } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);

  const movie = movies.find((b) => b.id === MovieID);

  useEffect(() => {
    if (user && user.FavoriteMovies) {
      const isFavorite = user.FavoriteMovies.includes(MovieID);
      setIsFavorite(isFavorite);
    }
  }, [MovieID, user]);

  if (!movie) return <div>Movie not found</div>;

  return (
    <div className="movie-view">
      <div>
        <img src={movie.ImageURL} alt={`${movie.Title} poster`} />
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
      <Link to="/">
        <Button variant="primary">Back</Button>
      </Link>
    </div>
  );
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
      }).isRequired,
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
      }).isRequired,
      ImageURL: PropTypes.string,
    })
  ).isRequired,
  user: PropTypes.shape({
    FavoriteMovies: PropTypes.arrayOf(PropTypes.string),
  }),
  token: PropTypes.string,
  setUser: PropTypes.func,
};
