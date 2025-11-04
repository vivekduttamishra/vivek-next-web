import React, { useState } from 'react';
import { Navbar, Nav, Container, Offcanvas, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import authorImage from '../assets/author-image.png';
import { useNavigate } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const [expanded, setExpanded] = useState(false);
  const [showBooksSubmenu, setShowBooksSubmenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    setExpanded(false);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" expanded={expanded} className="fixed-top">
        <Container fluid> {/* Changed to fluid for full width */}
          <Navbar.Brand href="/" className="me-lg-auto">VIVEK DUTTA MISHRA</Navbar.Brand>
          
          {/* Search and Buy - Desktop */}
          <div className="d-none d-lg-flex align-items-center me-4">
            <Button 
              variant="link" 
              className="text-white p-0 me-3" 
              onClick={() => setShowSearch(true)}
            >
              <FontAwesomeIcon icon={faSearch} size="lg" />
            </Button>
            <Button 
              variant="link" 
              className="text-white p-0" 
              href="/buy"
            >
              <FontAwesomeIcon icon={faShoppingCart} size="lg" />
            </Button>
          </div>

          <Navbar.Toggle 
            aria-controls="offcanvasNavbar" 
            onClick={() => setExpanded(!expanded)}
            className="border-0"
          >
            <FontAwesomeIcon icon={expanded ? faTimes : faBars} />
          </Navbar.Toggle>

          <Navbar.Collapse id="navbar-collapse">
            <Nav className="ms-auto d-lg-none">
              <Button 
                variant="link" 
                className="text-white" 
                onClick={() => {
                  setShowSearch(true);
                  setExpanded(false);
                }}
              >
                <FontAwesomeIcon icon={faSearch} className="me-2" />
                Search
              </Button>
              <Button 
                variant="link" 
                className="text-white" 
                href="/buy"
              >
                <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
                Buy
              </Button>
            </Nav>
            <Nav className="ms-lg-auto">
              <Nav.Link href="/" onClick={() => setExpanded(false)}>Home</Nav.Link>
              <div className="nav-item">
                <div 
                  className="nav-link d-flex justify-content-between align-items-center"
                  onClick={() => setShowBooksSubmenu(!showBooksSubmenu)}
                >
                  <span>Books</span>
                  <span>{showBooksSubmenu ? '−' : '+'}</span>
                </div>
                {showBooksSubmenu && (
                  <div className="sub-menu">
                    <Nav.Link href="/books" onClick={() => setExpanded(false)}>All Books</Nav.Link>
                    <Nav.Link href="/books/the-accursed-god" onClick={() => setExpanded(false)}>The Accursed God</Nav.Link>
                    <Nav.Link href="/books/manas" onClick={() => setExpanded(false)}>Manas</Nav.Link>
                    <Nav.Link href="/books/the-shadows-of-kali" onClick={() => setExpanded(false)}>The Shadows of Kali</Nav.Link>
                  </div>
                )}
              </div>
              <Nav.Link href="/about" onClick={() => setExpanded(false)}>About Me</Nav.Link>
              <Nav.Link href="/podcast" onClick={() => setExpanded(false)}>Podcast</Nav.Link>
              <Nav.Link href="/videos" onClick={() => setExpanded(false)}>Videos</Nav.Link>
              <Nav.Link href="/blog" onClick={() => setExpanded(false)}>Blog</Nav.Link>
              <Nav.Link href="/contact" onClick={() => setExpanded(false)}>Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Search Modal */}
      {showSearch && (
        <div className="search-modal">
          <div className="search-backdrop" onClick={() => setShowSearch(false)} />
          <div className="search-content">
            <button 
              className="search-close"
              onClick={() => setShowSearch(false)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <div className="search-input-container">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search books, articles..." 
                autoFocus
                className="search-input"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;