import React from "react";
import "./BookHeader.css"; // Assuming you have a CSS file for styling
const BookHeader = ({ title, authorId, rating, price, formats }) => {
  return (
    <div className="book-header" >
      <h1 className='book-title'>{title}</h1>
      {/* <p className="author">By {authorId}</p> */}
      <div className="rating">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i}>{i < Math.floor(rating) ? "★" : "☆"}</span>
        ))}
        <span>({rating})</span>
      </div>
      <div className="buy-section price-buttons">
        
        {formats.map((format) => (
          <a key={format.type} href={format.url} target="_blank" className="format-button btn btn-sm btn-outline-primary">
            {format.type} (₹{format.price})
          </a>
        ))}
      </div>
    </div>
  );
};

export default BookHeader;