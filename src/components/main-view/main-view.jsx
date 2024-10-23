import React, { useEffect, useState } from "react";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { MoviesFilter } from "../movies-filter/movies-filter"; 
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";
import { setUser } from "../../redux/reducers/user/user";  
import Form from "react-bootstrap/Form";

export const MainView = () => {
  const movies = useSelector((state) => state.movies.list);
  const filter = useSelector((state) => state.movies.filter);  
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  
  const storedToken = localStorage.getItem('token') || null;
  const storedUser = localStorage.getItem('user') && localStorage.getItem('user') !== 'undefined'
    ? JSON.parse(localStorage.getItem('user'))
    : null; // Fixed parsing

  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    if (storedUser) {
      dispatch(setUser(storedUser));
    }

    if (!storedToken) return; 

    fetch("https://myflixmovies123-d3669f5b95da.herokuapp.com/movies", {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${storedToken}`, 
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        return response.json();
      })
      .then((data) => {
        const moviesFromApi = data.map((movie) => ({
          id: movie._id,
          title: movie.Title,
          image: movie.ImageURL || "https://via.placeholder.com/150",
          director: movie.Director?.Name || "Unknown Director",
          description: movie.Description || "No description available",
          genre: movie.Genre?.Name || "Unknown genre",
        }));

        dispatch(setMovies(moviesFromApi));
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [dispatch, storedToken, storedUser]);

  const handleLogin = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    dispatch(setUser(data.user));
  };

  const filteredMovies = movies.filter((movie) => {
    return (
      movie.title.toLowerCase().includes(filter.toLowerCase()) &&
      (!selectedGenre || movie.genre === selectedGenre)
    );
  });

  return (
    <BrowserRouter>
      <Row>
        <NavigationBar />
      </Row>
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              user ? <Navigate to="/" replace /> : <Col md={5}><SignupView /></Col>
            }
          />
          <Route
            path="/login"
            element={
              user ? <Navigate to="/" replace /> : <Col md={5}><LoginView onLoggedIn={handleLogin} /></Col>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : movies.length === 0 ? (
                <Col>The list is empty!</Col>
              ) : (
                <Col md={8}><MovieView /></Col>
              )
            }
          />
          <Route
            path="/"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : (
                <>
                  <Row className="justify-content-center mb-4">
                    <Col md={6}>
                      <MoviesFilter />
                    </Col>
                    <Col md={6}>
                      <Form.Select
                        value={selectedGenre}
                        onChange={(e) => setSelectedGenre(e.target.value)}
                      >
                        <option value="">All genres</option>
                        {[...new Set(movies.map((m) => m.genre))]
                          .sort()
                          .map((genre) => (
                            <option key={genre} value={genre}>
                              {genre}
                            </option>
                          ))}
                      </Form.Select>
                    </Col>
                  </Row>
                  <Row>
                    {filteredMovies.length === 0 ? (
                      <Col>No movies found!</Col>
                    ) : (
                      filteredMovies.map((movie) => (
                        <Col className="mb-4" key={movie.id} xs={8} sm={6} md={4} lg={2}>
                          <MovieCard movieData={movie} />
                        </Col>
                      ))
                    )}
                  </Row>
                </>
              )
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
