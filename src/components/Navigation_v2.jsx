import React, { useState } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import SearchModal from './SearchModal'; // Create this component

const Navigation = () => {
  const [showSearch, setShowSearch] = useState(false);
  const buttonIconStyle={
    color: 'white',
    cursor: 'pointer'
  }
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="fixed-top">
        <Container>
          <Navbar.Brand href="/" className="me-auto">VIVEK DUTTA MISHRA</Navbar.Brand>
          
          {/* Always visible search/buy buttons */}
          <div className="d-flex align-items-center">            
              <FontAwesomeIcon className="me-2" icon={faSearch} style={buttonIconStyle} onClick={() => setShowSearch(true)}/>
              <FontAwesomeIcon icon={faShoppingCart} style={buttonIconStyle} className="me-1" />
          </div>

          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <FontAwesomeIcon style={buttonIconStyle} icon={faBars} />
          </Navbar.Toggle>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/books">Books</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/podcast">Podcast</Nav.Link>
              <Nav.Link href="/videos">Videos</Nav.Link>
              <Nav.Link href="/blog">Blog</Nav.Link>
              <Nav.Link href="/contact">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <SearchModal show={showSearch} onHide={() => setShowSearch(false)} />
    </>
  );
};

export default Navigation;