import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { BiLogIn } from "react-icons/bi";
import { BiEdit } from "react-icons/bi";
import { ImExit } from "react-icons/im";
import { AiFillDashboard } from "react-icons/ai";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../pages/user-redux/userSlice";

export const Header = () => {
  const { user } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  const handleOnLogout = () => {
    // logout
    signOut(auth).then(() => {
      // rest user in our state
      dispatch(setUser({}));
    });
  };
  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container>
        <Navbar.Brand href="/">Tech Gare</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user?.uid ? (
              <>
                {" "}
                <Link className="nav-link" to="/dashboard">
                  <AiFillDashboard /> Dashboard
                </Link>
                <Link className="nav-link" to="#!" onClick={handleOnLogout}>
                  <ImExit /> Logout
                </Link>
              </>
            ) : (
              <Link className="nav-link" to="/">
                <BiLogIn /> Login
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
