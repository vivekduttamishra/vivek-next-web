import React from 'react';
import { Navbar, Nav, Container, Offcanvas } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import authorImage from '../assets/author-image.png';
import './Navigation.css'; // We'll create this

const Navigation = ({ menuExpanded, setMenuExpanded }) => {
  const [booksExpanded, setBooksExpanded] = React.useState(false);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="fixed-top">
        <Container>
          <Navbar.Brand href="/">VIVEK DUTTA MISHRA</Navbar.Brand>
          <Navbar.Toggle 
            aria-controls="offcanvasNavbar" 
            onClick={() => setMenuExpanded(!menuExpanded)}
          >
            <FontAwesomeIcon icon={menuExpanded ? faTimes : faBars} />
          </Navbar.Toggle>
        </Container>
      </Navbar>

      <Offcanvas
        show={menuExpanded}
        onHide={() => setMenuExpanded(false)}
        placement="end"
        className="custom-offcanvas"
      >
        <div 
          className="menu-backdrop"
          style={{ backgroundImage: `url(${authorImage})` }}
        />
        <Offcanvas.Header closeButton className="text-white">
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link href="/" className="text-white">Home</Nav.Link>
            <Nav.Link 
              onClick={() => setBooksExpanded(!booksExpanded)}
              className="d-flex justify-content-between align-items-center text-white"
            >
              Books
              <FontAwesomeIcon icon={booksExpanded ? faChevronUp : faChevronDown} />
            </Nav.Link>
            
            {booksExpanded && (
              <div className="sub-menu ps-4">
                <Nav.Link href="/books" className="text-white">All Books</Nav.Link>
                <Nav.Link href="/books/the-accursed-god" className="text-white">The Accursed God</Nav.Link>
                <Nav.Link href="/books/manas" className="text-white">Manas</Nav.Link>
                <Nav.Link href="/books/the-shadows-of-kali" className="text-white">The Shadows of Kali (Coming Soon)</Nav.Link>
              </div>
            )}
            
            <Nav.Link href="/about" className="text-white">About Me</Nav.Link>
            <Nav.Link href="/podcast" className="text-white">Podcast</Nav.Link>
            <Nav.Link href="/videos" className="text-white">Videos</Nav.Link>
            <Nav.Link href="/blog" className="text-white">Blog</Nav.Link>
            <Nav.Link href="/contact" className="text-white">Contact</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Navigation;