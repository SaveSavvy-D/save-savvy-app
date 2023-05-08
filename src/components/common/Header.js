import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSackDollar } from '@fortawesome/free-solid-svg-icons';

import '../css/Header.css';

function Header() {
  const { pathname } = useLocation();
  if (pathname === '/auth') {
    return null;
  }
  return (
    <Navbar
      collapseOnSelect
      expand='lg'
      variant='dark'
      className='margin-bottom-50'
    >
      <Container>
        <Navbar.Brand as={Link} to='/'>
          <FontAwesomeIcon icon={faSackDollar} className='margin-right-5' />
          SaveSavvy
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='ms-auto'>
            <Nav.Link className='margin-right-20' as={Link} to='/expenses'>
              Expenses
            </Nav.Link>
            <Nav.Link className='margin-right-20' as={Link} to='/budgets'>
              Budgets
            </Nav.Link>
            <NavDropdown
              title={<FontAwesomeIcon icon={faUser} size='lg' />}
              id='basic-nav-dropdown'
            >
              <NavDropdown.Item>Profile</NavDropdown.Item>
              <NavDropdown.Item>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
