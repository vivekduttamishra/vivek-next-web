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
import menuItems from '../data/menu-items';

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

 

  return (
    <>
      <Navbar bg="dark" variant="dark" className="fixed-top custom-navbar">
        <Container fluid className="navbar-container">
          <Navbar.Brand href="/" className="navbar-brand title-text">Vivek Dutta Mishra</Navbar.Brand>
          
          <div className="navbar-icons">
            {/* <button 
              className="icon-button" 
              onClick={() => setShowSearch(true)}
              aria-label="Search"
            >
              <FontAwesomeIcon icon={faSearch} />
            </button> */}
            <button 
              className="icon-button buy-button" 
              onClick={() => navigate('/books')}
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