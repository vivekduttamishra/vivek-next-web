import React, { useState, useEffect } from 'react';
import { Navbar, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBars, 
  faTimes, 
  faSearch, 
  faShoppingCart,
  faChevronLeft,
  faChevronRight
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
  const [activeSubmenu, setActiveSubmenu] = useState(null);
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

  const menuItems = [
    { path: "/", label: "Home" },
    { 
      label: "Books",
      submenu: [
        { path: "/books", label: "All Books" },
        { path: "/books/the-accursed-god", label: "The Accursed God" },
        { path: "/books/manas", label: "Manas" },
        { path: "/books/the-shadows-of-kali", label: "The Shadows of Kali" }
      ]
    },
    { path: "/about", label: "About Me" },
    { 
      label: "Podcast",
      submenu: [
        { path: "/podcast/episodes", label: "All Episodes" },
        { path: "/podcast/latest", label: "Latest Episode" }
      ]
    },
    { path: "/videos", label: "Videos" },
    { 
      label: "Blog",
      submenu: [
        { path: "/blog", label: "All Posts" },
        { path: "/blog/category/books", label: "Book Reviews" },
        { path: "/blog/category/writing", label: "Writing Tips" }
      ]
    },
    { path: "/contact", label: "Contact" }
  ];

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
  {/* Background images - changed to cover instead of contain */}
  <div 
    className={isMobile ? 'menu-backdrop' : 'desktop-menu-background'} 
    style={{ backgroundImage: `url(${authorImage})` }} 
  />
        
        <div className="menu-content">
          {/* Back button - shown only in submenu */}
          {activeSubmenu !== null && (
            <div className="back-button-container">
              <button 
                className="back-button"
                onClick={() => setActiveSubmenu(null)}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
                <span>Back to Menu</span>
              </button>
            </div>
          )}

          <nav className="main-menu">
            {activeSubmenu === null ? (
              <>
                {menuItems.map((item, index) => (
                  item.submenu ? (
                    <div 
                      key={index}
                      className="menu-item"
                      onClick={() => setActiveSubmenu(index)}
                    >
                      <span>{item.label}</span>
                      <FontAwesomeIcon icon={faChevronRight} />
                    </div>
                  ) : (
                    <Link 
                      key={index}
                      to={item.path} 
                      className="menu-item" 
                      onClick={() => setExpanded(false)}
                    >
                      <span>{item.label}</span>
                    </Link>
                  )
                ))}
              </>
            ) : (
              <>
                {menuItems[activeSubmenu].submenu.map((subItem, subIndex) => (
                  <Link 
                    key={subIndex}
                    to={subItem.path} 
                    className="sub-menu-item" 
                    onClick={() => {
                      setExpanded(false);
                      setActiveSubmenu(null);
                    }}
                  >
                    {subItem.label}
                  </Link>
                ))}
              </>
            )}
          </nav>

          {/* Social links - always visible at bottom */}
          <div className="social-section">
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