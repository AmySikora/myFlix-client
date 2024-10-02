import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card"; // Correct import
import { MovieView } from "../movie-view/movie-view";
import { SignupView } from "../signup-view/signup-view";
import { LoginView } from "../login-view/login-view"; // Ensure this import is correct
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

export const MainView = () => {
  // Retrieve stored user and token from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://myflixmovies123-d3669f5b95da.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [token]);

  if (!user) {
    return (
     <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={5}>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
              // Save user and token to localStorage
              localStorage.setItem("user", JSON.stringify(user));
              localStorage.setItem("token", token);
            }}
          />
         </Col>
          <Col md={12} className="text-center my-3">
            <span>or</span>
          </Col>
          <Col md={5}>
            <SignupView />
            </Col>
            </Row>
            </Container> 
            );
          }
           if (selectedMovie) {
              return (
                <Col md={8}>
                  <MovieView
                    movie={selectedMovie}
                    onBackClick={() => setSelectedMovie(null)}
                  />
                </Col>
            );
          }
  
          if (movies.length === 0) {
            return <div>The list is empty!</div>;
          }
          
          return (
            <div>
              {movies.map((movie) => (
                <MovieCard
                  key={_id.movie}
                  movie={movie}
                  onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                  }}
                />
              ))}
              <button 
              onClick={() => { 
                setUser(null); 
                setToken(null); 
                localStorage.clear(); 
                }}>Logout</button>
            </div>
          );
        };