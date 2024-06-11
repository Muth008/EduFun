import { Link } from 'react-router-dom';
import { mdiAccount } from '@mdi/js';
import Icon from '@mdi/react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../../assets/css/navBar/NavBar.css';

function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary"  style={{ marginBottom: '20px' }}>
      <Container>
        <Navbar.Brand as={Link} to="/">EduFun</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="navbar-collapse">
          <Nav>
            <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/scoreboard">Scoreboard</Nav.Link>
            <Nav.Link as={Link} to="/account">
              <Icon path={mdiAccount} size={1} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;