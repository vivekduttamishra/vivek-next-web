import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, ListGroup, Accordion } from 'react-bootstrap';
import bookService from '../services/book-service';
import HorizontalList from '../components/HorizontalList';
import { Link } from 'react-router-dom';
import './Books.css';
const renderBookInfo = (book) => {
  return (
    <Link to={`/books/${book.id}`} className="book-link">
      <img src={book.covers[0]} alt={book.title} className="cover-thumb" />
      <p>
        {book.title}
      </p>
    </Link>
  )
}

const Books = () => {
  const [theLostEpicSeries, setTheLostEpicSeries] = useState([]);
  const [hindiBooks, setHindiBooks] = useState([]);

  useEffect(() => {
    bookService.getBooksBySeries('The Lost Epic').then(setTheLostEpicSeries)
    bookService.getBooksByTag('Hindi').then(setHindiBooks)
  }, []);


  return (
    <div>
      <HorizontalList
        title="The Lost Epic Series"
        items={theLostEpicSeries}
        className="book-list-item"
        renderItem={renderBookInfo}
      />
      <HorizontalList
        title="Hindi Books"
        className="book-list-item"
        items={hindiBooks}
        renderItem={renderBookInfo}
      />
    </div>
  );
};

export default Books;