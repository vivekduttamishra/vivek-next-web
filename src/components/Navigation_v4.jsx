import React, { useState } from 'react';
import { Navbar, Container } from 'react-bootstrap';
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
      {/* Main Navbar */}
      <Navbar bg="dark" variant="dark" className="fixed-top custom-navbar">
        <Container fluid className="navbar-container">
          <Navbar.Brand href="/" className="navbar-brand title-text">Vivek Dutta Mishra</Navbar.Brand>
          
          {/* Search and Buy Buttons */}
          <div className="navbar-icons">
            <button 
              className="icon-button" 
              onClick={() => setShowSearch(true)}
              aria-label="Search"
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
            <button 
              className="icon-button" 
              onClick={() => handleNavigate('/buy')}
              aria-label="Buy"
            >
              <FontAwesomeIcon icon={faShoppingCart} />
            </button>
            <button 
              className="icon-button menu-toggle" 
              onClick={() => setExpanded(!expanded)}
              aria-label="Menu"
            >
              <FontAwesomeIcon icon={expanded ? faTimes : faBars} />
            </button>
          </div>
        </Container>
      </Navbar>

      {/* Fullscreen Menu Overlay */}
      <div className={`menu-overlay ${expanded ? 'visible' : ''}`}>
        <div 
          className="menu-backdrop"
          style={{ backgroundImage: `url(${authorImage})` }}
        />
        <div className="menu-content">
          <nav className="main-menu">
            <a href="/" className="menu-item" onClick={() => setExpanded(false)}>Home</a>
            
            <div className="menu-item-container">
              <div 
                className="menu-item menu-item-with-arrow"
                onClick={() => setShowBooksSubmenu(!showBooksSubmenu)}
              >
                Books
                <span className="menu-arrow">{showBooksSubmenu ? '−' : '+'}</span>
              </div>
              {showBooksSubmenu && (
                <div className="sub-menu">
                  <a href="/books" className="sub-menu-item" onClick={() => setExpanded(false)}>All Books</a>
                  <a href="/books/the-accursed-god" className="sub-menu-item" onClick={() => setExpanded(false)}>The Accursed God</a>
                  <a href="/books/manas" className="sub-menu-item" onClick={() => setExpanded(false)}>Manas</a>
                  <a href="/books/the-shadows-of-kali" className="sub-menu-item" onClick={() => setExpanded(false)}>The Shadows of Kali</a>
                </div>
              )}
            </div>
            
            <a href="/about" className="menu-item" onClick={() => setExpanded(false)}>About Me</a>
            <a href="/podcast" className="menu-item" onClick={() => setExpanded(false)}>Podcast</a>
            <a href="/videos" className="menu-item" onClick={() => setExpanded(false)}>Videos</a>
            <a href="/blog" className="menu-item" onClick={() => setExpanded(false)}>Blog</a>
            <a href="/contact" className="menu-item" onClick={() => setExpanded(false)}>Contact</a>
          </nav>
        </div>
      </div>

      {/* Search Modal */}
      {showSearch && (
        <div className="search-modal">
          <div className="search-backdrop" onClick={() => setShowSearch(false)} />
          <div className="search-content">
            <button 
              className="search-close"
              onClick={() => setShowSearch(false)}
              aria-label="Close search"
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