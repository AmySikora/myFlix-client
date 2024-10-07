export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  
  // Define states for user, token, and movies
  const [user, setUser] = useState(storedUser || null);
  const [token, setToken] = useState(storedToken || null);
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState(""); // Assuming filter state is needed for the search functionality

  useEffect(() => {
    if (!token) return;  // Exit early if no token is available

    fetch("https://myflixmovies123-d3669f5b95da.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.Title,
            image: movie.URL || "https://via.placeholder.com/150",
            director: movie.Director || "Unknown Director",
            description: movie.Description || "No description available",
            genre: movie.Genre || "Unknown genre"
          };
        });
        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, [token]);  // Add token as a dependency

  const handleLoggedOut = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={handleLoggedOut} />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Col md={5}>
                  <SignupView />
                </Col>
              )
            }
          />
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Col md={5}>
                  <LoginView
                    onLoggedIn={(user, token) => {
                      setUser(user);
                      setToken(token);
                      localStorage.setItem("user", JSON.stringify(user));
                      localStorage.setItem("token", token);
                    }}
                  />
                </Col>
              )
            }
          />
          <Route
            path="/profile"
            element={
              user ? (
                <Col md={8}>
                  <ProfileView
                    user={user}
                    token={token}
                    movies={movies}
                    setUser={setUser}
                  />
                </Col>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              movies.length === 0 ? (
                <p>Loading movies...</p>
              ) : (
                <Col md={8}>
                  <MovieView
                    movies={movies}
                    user={user}
                    token={token}
                    setUser={setUser}
                  />
                </Col>
              )
            }
          />
          <Route
            path="/"
            element={
              user ? (
                <>
                  {movies.length === 0 ? (
                    <p>Loading movies...</p>
                  ) : (
                    <>
                      <Row className="justify-content-md-center">
                        <Col md={6}>
                          <Form.Control
                            type="text"
                            placeholder="Search for a movie"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="mb-4"
                            style={{ width: "100%", marginTop: "20px" }}
                          />
                        </Col>
                      </Row>

                      {filteredMovies.length === 0 ? (
                        <p>No movies found</p>
                      ) : (
                        <Row>
                          {filteredMovies.map((movie) => (
                            <Col className="mb-5" key={movie.id} md={3}>
                              <MovieCard movie={movie} />
                            </Col>
                          ))}
                        </Row>
                      )}
                    </>
                  )}
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
