import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faTwitter,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';
import './Footer.css';
import Social from './Social';

const Footer = () => {
  return (
    <footer className="footer">
      <Social/>
    </footer>
  );
};

export default Footer;