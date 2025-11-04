import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navigation from './components/Navigation';
import Home from './screens/Home';
import Books from './screens/Books';
import About from './screens/About';
import Podcast from './screens/Podcast';
import Videos from './screens/Videos';
import Blog from './screens/Blog';
import Contact from './screens/Contact';
import Footer from './components/Footer';
import BookDetails from './screens/BookDetails';
import config from './data/config';
import MahabharataQuery from './screens/MahabharataQuery';
import MahabharataFAQ from './screens/MahabharataFAQ';
import Redirector from './components/Redirector';


function App() {
  const [menuExpanded, setMenuExpanded] = useState(false);

  const navigate = useNavigate();

  // useEffect(() => {
  //   const storedRedirect = sessionStorage.getItem('redirect');
  //   sessionStorage.removeItem('redirect');

  //   if (storedRedirect && storedRedirect.startsWith('/vivek/')) {
  //     navigate(storedRedirect.substring('/vivek'.length), { replace: true });
  //   }
  // }, [navigate]); 



  return (
    <div className="app-container">
      <Navigation
        menuExpanded={menuExpanded}
        setMenuExpanded={setMenuExpanded}
      />
      <div className={menuExpanded ? 'screen content-blur' : 'screen'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/books/:id/:tab" element={<BookDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/about/:tab" element={<About />} />
          <Route path="/podcast" element={<Podcast />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mahabharata/youtube" element={<Videos playlist={config.MAHABHARATA_EK_KHOJ_PLAYLIST_ID} />} />
          <Route path="/mahabharata/podcast" element={<Podcast />} />
          <Route path="/mahabharata/query" element={<MahabharataQuery />} />
          <Route path="/mahabharata/faq" element={<MahabharataFAQ />} />
          <Route path="*" element={<Redirector/>} />
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

const RouterApp = () => {

  return (
    <Router >
      <App />
    </Router>
  )
}

export default RouterApp;