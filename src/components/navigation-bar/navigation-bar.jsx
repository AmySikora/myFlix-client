import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from ".../.../redux/reducers/user/user.js"; 

export const NavigationBar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

    return (
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand as={Link} to="/">
              MyFlix App
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {!user && (
                  <>
                    <Nav.Link as={Link} to="/login">
                      Login
                    </Nav.Link>
                    <Nav.Link as={Link} to="/signup">
                      Signup
                    </Nav.Link>
                    <Nav.Link onCLick={() => dispatch(setUser(null))}>
                      Logout
                    </Nav.Link>
                  </>
                )}
                {user && (
                  <>
                    <Nav.Link as={Link} to="/">
                      Home
                    </Nav.Link>
                    <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
    };    