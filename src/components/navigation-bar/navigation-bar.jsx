import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../../redux/reducers/user/user";  // Action to clear the user from Redux

export const NavigationBar = () => {
  const user = useSelector((state) => state.user?.user);  // Use optional chaining to avoid errors
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLoggedOut = () => {
    // Clear the user data from Redux store and localStorage
    dispatch(clearUser());
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Redirect to the login page
    navigate("/login");
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          MyFlix App
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user ? (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Signup
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>  {/* Handle logout */}
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
