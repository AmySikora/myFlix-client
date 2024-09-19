import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setmovies] = useState([
    {
      id: 1,
      title: "The Godfather",
      image:
        "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg",
      genre: "Gangster Film",
      director: "Francis Ford Coppola",
    },
    {
      id: 2,
      title: "Reservoir Dogs",
      image:
      "https://en.wikipedia.org/wiki/File:Reservoir_Dogs.png",
      genre: "Crime Film",
      director: "Quentin Tarantino",
    },
    {
      id: 3,
      title: "The Shawshank Redemption",
      image:
      "https://en.wikipedia.org/wiki/File:ShawshankRedemptionMoviePoster.jpg",
      genre: "Drama",
      director: "Frank Darabont",
    },
    {
      id: 4,
      title: "Silence of the Lambs",
      image:
        "https://upload.wikimedia.org/wikipedia/en/8/86/The_Silence_of_the_Lambs_poster.jpg",
      genre: "Thriller",
      director: "Jonathan Demme",
    },
    {
      id: 5,
      title: "One Flew Over the Cuckoo's Nest",
      image:
      "https://upload.wikimedia.org/wikipedia/en/2/26/One_Flew_Over_the_Cuckoo%27s_Nest_poster.jpg?20170307125725",
      genre: "Drama",
      director: "Milos Forman",
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
