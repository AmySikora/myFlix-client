import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user/user";

export const NavigationBar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

    return (
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">
              MyFlix 
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Link as={Link} to="/login">
                  <span className="nav">Login</span>
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  <span className="nav">Signup</span>
                </Nav.Link>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/">
                  <span className="nav"> Home</span>
                </Nav.Link>
                <Nav.Link as={Link} to={`/users/${user.userName}`}>
                  <span className="nav"> Profile</span>
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>
                  <span className="nav">Logout</span>
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};