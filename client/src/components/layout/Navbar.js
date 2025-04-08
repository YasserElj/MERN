import React, { useContext } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import AuthContext from '../../context/auth/authContext';

const AppNavbar = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout, user } = authContext;

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <Nav>
      <NavDropdown title={`Welcome, ${user ? user.name : 'User'}`} id="basic-nav-dropdown">
        <LinkContainer to="/posts/new">
          <NavDropdown.Item>Create Post</NavDropdown.Item>
        </LinkContainer>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={onLogout}>Logout</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  );

  const guestLinks = (
    <Nav>
      <LinkContainer to="/register">
        <Nav.Link>Register</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/login">
        <Nav.Link>Login</Nav.Link>
      </LinkContainer>
    </Nav>
  );

  return (
    <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <i className="fas fa-graduation-cap"></i> School Blog
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
          </Nav>
          {isAuthenticated ? authLinks : guestLinks}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar; 