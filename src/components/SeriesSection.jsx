import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BookService from '../services/book-service';
import './SeriesSection.css'; // Assuming you have a CSS file for styling
import HorizontalList from './HorizontalList';

const SeriesSection = ({ series }) => {
  const [seriesBooks, setSeriesBooks] = useState([]);
  useEffect(() => {
    BookService.getBooksBySeries(series.name).then(setSeriesBooks);
  }, []);

  return (
    <div className="series-section">
      <p className="series-description long-text">{series.description}</p>

      <HorizontalList
        title="The Lost Epic Series Books"
        items={seriesBooks}
        renderItem={(book) => (
          <div className="book-item">
            <img src={book.covers[0]} alt={book.title} className="book-cover" />
            <h3>{book.title}</h3>
            <p>{book.author}</p>
          </div>
        )}
        minItemWidth={160}
        maxItemWidth={220}
        gap={24}
      />



      {/* <div className="series-books-list">
        {seriesBooks.map((book) => (
          <Link to={`/books/${book.id}`} key={book.id} className="series-book">
            <img src={book.covers[0]} alt={book.title} />
            <div className="book-info">
              <h4>#{book.series.number} {book.title}</h4>              
            </div>
          </Link>
        ))}
      </div> */}


    </div>
  );
};

export default SeriesSection;