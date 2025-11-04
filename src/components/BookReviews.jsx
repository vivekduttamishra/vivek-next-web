import React from 'react';
import './BookReviews.css';

const BookReviews = ({ reviews }) => {
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <div className="reviews-tab">
      <h3>Reviews ({reviews.length})</h3>
      <div className="average-rating">
        Average: {averageRating.toFixed(1)}/5
      </div>
      <div className="reviews-list">
        {reviews.map((review, index) => (
          <div key={index} className="review-card">
            <div className="reviewer-info">
              <img src={review.reviewerPhoto} alt={review.reviewerName} />
              <div>
                <h4>{review.reviewerName}</h4>
                <div className="review-rating">
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </div>
              </div>
            </div>
            <h5>{review.reviewTitle}</h5>
            <p dangerouslySetInnerHTML={{ __html: review.review }}></p>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookReviews;