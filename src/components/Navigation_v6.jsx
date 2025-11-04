import React, { useState, useEffect } from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBars, 
  faTimes, 
  faSearch, 
  faShoppingCart,
  faChevronLeft
} from '@fortawesome/free-solid-svg-icons';
import {
  faInstagram,
  faTwitter,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';
import authorImage from '../assets/author-image.png';
import { useNavigate, Link } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const [expanded, setExpanded] = useState(false);
  const [showBooksSubmenu, setShowBooksSubmenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Navbar bg="dark" variant="dark" className="fixed-top custom-navbar">
        <Container fluid className="navbar-container">
          <Navbar.Brand href="/" className="navbar-brand title-text">Vivek Dutta Mishra</Navbar.Brand>
          
          <div className="navbar-icons">
            <button 
              className="icon-button" 
              onClick={() => setShowSearch(true)}
              aria-label="Search"
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
            <button 
              className="icon-button buy-button" 
              onClick={() => navigate('/buy')}
              aria-label="Buy"
            >
              <FontAwesomeIcon icon={faShoppingCart} />
              <span className="buy-text">Buy</span>
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

      <div className={`menu-overlay ${expanded ? 'visible' : ''} ${isMobile ? 'mobile' : 'desktop'}`}>
        {isMobile ? (
          <div className="menu-backdrop" style={{ backgroundImage: `url(${authorImage})` }} />
        ) : (
          <div className="desktop-menu-background" style={{ backgroundImage: `url(${authorImage})` }} />
        )}
        
        <div className="menu-content">
          {/* Back button - shown only in submenu */}
          {showBooksSubmenu && (
            <div className="back-button-container">
              <button 
                className="back-button"
                onClick={() => setShowBooksSubmenu(false)}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
                <span>Back to Menu</span>
              </button>
            </div>
          )}

          <nav className="main-menu">
            {!showBooksSubmenu ? (
              <>
                <Link to="/" className="menu-item" onClick={() => setExpanded(false)}>Home</Link>
                <div 
                  className="menu-item"
                  onClick={() => setShowBooksSubmenu(true)}
                >
                  <span>Books</span>
                </div>
                <Link to="/about" className="menu-item" onClick={() => setExpanded(false)}>About Me</Link>
                <Link to="/podcast" className="menu-item" onClick={() => setExpanded(false)}>Podcast</Link>
                <Link to="/videos" className="menu-item" onClick={() => setExpanded(false)}>Videos</Link>
                <Link to="/blog" className="menu-item" onClick={() => setExpanded(false)}>Blog</Link>
                <Link to="/contact" className="menu-item" onClick={() => setExpanded(false)}>Contact</Link>
              </>
            ) : (
              <>
                <Link to="/books" className="sub-menu-item" onClick={() => setExpanded(false)}>All Books</Link>
                <Link to="/books/the-accursed-god" className="sub-menu-item" onClick={() => setExpanded(false)}>The Accursed God</Link>
                <Link to="/books/manas" className="sub-menu-item" onClick={() => setExpanded(false)}>Manas</Link>
                <Link to="/books/the-shadows-of-kali" className="sub-menu-item" onClick={() => setExpanded(false)}>The Shadows of Kali</Link>
              </>
            )}
          </nav>

          {/* Social links - shown only in main menu */}
          {!showBooksSubmenu && (
            <div className="social-section">
              <div className="social-title">BE THE FIRST TO KNOW</div>
              <div className="social-icons">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faYoutube} />
                </a>
              </div>
            </div>
          )}
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
            <h3 className="search-title">Search Books & Articles</h3>
            <div className="search-input-container">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search by title or keyword..." 
                autoFocus
                className="search-input"
              />
            </div>
            <button className="search-submit">Search</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;