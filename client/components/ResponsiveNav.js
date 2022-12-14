import Container from 'react-bootstrap/Container';
import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { logout } from '../redux/store';
import Button from 'react-bootstrap/Button';
import { Link, BrowserRouter, Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';

function ResponsiveNavBar({ handleLogout, isLoggedIn }) {
  return (
    <Navbar expand='lg' className='bg-pretty'>
      <Container>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <img style={{ width: '8rem' }} src='/images/logo-PartyPal.png' />
        </Link>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav' className='pink'>
          <Nav className='me-auto responsive-nav'>
            {isLoggedIn ? (
              <div className='nav-flex'>
                <Link
                  className='responsiveNavLinks nav-links text-decoration'
                  to='/start'
                >
                  Start Planning
                </Link>

                <Link
                  className='responsiveNavLinks nav-links text-decoration'
                  to='/account'
                >
                  My Account
                </Link>
                <Link
                  className='responsiveNavLinks nav-links text-decoration'
                  to='/'
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </div>
            ) : (
              <div className='nav-flex'>
                <Link
                  className='responsiveNavLinks nav-links text-decoration'
                  to='/start'
                >
                  Start Planning
                </Link>

                <Link
                  className='responsiveNavLinks nav-links text-decoration'
                  to='/login'
                >
                  Log in
                </Link>

                <Link
                  className='responsiveNavLinks nav-links text-decoration'
                  to='/signup'
                >
                  Sign up
                </Link>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

const mapState = (state) => {
  return {
    isLoggedIn: state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleLogout: () => dispatch(logout()),
  };
};

export default connect(mapState, mapDispatch)(ResponsiveNavBar);
