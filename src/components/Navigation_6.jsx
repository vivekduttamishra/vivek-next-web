import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBars, 
  faTimes,
  faChevronLeft,
  faSearch
} from '@fortawesome/free-solid-svg-icons';
import {
  faInstagram,
  faTwitter,
  faFacebook,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';
import authorImage from '../assets/author-image.png';
import './Navigation.css';

const Navigation = () => {
  const [expanded, setExpanded] = useState(false);
  const [currentMenu, setCurrentMenu] = useState('main');
  const [showSearch, setShowSearch] = useState(false);

  const menuData = {
    main: {
      title: "Menu",
      items: [
        { label: "Home", id: "home" },
        { label: "Books", id: "books", hasSubmenu: true },
        { label: "About Me", id: "about" },
        { label: "Tour & Events", id: "events" },
        { label: "Shop", id: "shop" }
      ]
    },
    books: {
      title: "Books",
      items: [
        { label: "All Books", id: "all" },
        { label: "The Accursed God", id: "accursed-god" },
        { label: "Manas", id: "manas" },
        { label: "The Shadows of Kali", id: "shadows-kali" }
      ]
    }
  };

  const handleMenuClick = (item) => {
    if (item.hasSubmenu) {
      setCurrentMenu(item.id);
    } else {
      // Handle regular menu item click
      setExpanded(false);
    }
  };

  const handleBackClick = () => {
    setCurrentMenu('main');
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-top">
          <div className="navbar-brand">
            VIVEK DUTTA MISHRA
          </div>
          
          <div className="navbar-controls">
            <button 
              className="search-button"
              onClick={() => setShowSearch(true)}
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
            <button 
              className="menu-toggle"
              onClick={() => {
                setExpanded(!expanded);
                if (!expanded) {
                  setCurrentMenu('main');
                }
              }}
            >
              <FontAwesomeIcon icon={expanded ? faTimes : faBars} />
            </button>
          </div>
        </div>

        {/* Menu Panel */}
        <div className={`menu-panel ${expanded ? 'expanded' : ''}`}>
          <div className="menu-header">
            {currentMenu !== 'main' && (
              <button className="back-button" onClick={handleBackClick}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
            )}
            <h3>{menuData[currentMenu].title}</h3>
          </div>

          <div className="menu-items">
            {menuData[currentMenu].items.map((item) => (
              <div
                key={item.id}
                className="menu-item"
                onClick={() => handleMenuClick(item)}
              >
                {item.label}
              </div>
            ))}
          </div>

          {currentMenu === 'main' && (
            <div className="social-links">
              <div className="social-title">BE THE FIRST TO KNOW</div>
              <div className="social-icons">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faYoutube} />
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Search Modal */}
      {showSearch && (
        <div className="search-modal">
          <div className="search-backdrop" onClick={() => setShowSearch(false)} />
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search books, articles..." 
              autoFocus
            />
            <button className="close-search" onClick={() => setShowSearch(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        </div>
      )}

      {/* Background */}
      <div className="background-container">
        <div 
          className="background-image" 
          style={{ backgroundImage: `url(${authorImage})` }}
        />
      </div>
    </>
  );
};

export default Navigation;