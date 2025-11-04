import React, { useState } from 'react';
import BookReviews from './BookReviews';
import TrailerList from './TrailerList';
import SeriesSection from './SeriesSection';
import './BookTabs.css';

const Tabs = ({ book }) => {
  const [activeTab, setActiveTab] = useState('description');

  const tabs = [
    { id: 'description', label: 'Description' },
    ...(book.trailers?.length ? [{ id: 'trailers', label: 'Trailers' }] : []),
    ...(book.reviews?.length ? [{ id: 'reviews', label: `Reviews` }] : []),
    ...(book.series ? [{ id: 'series', label: 'Series' }] : [])
  ];

  //console.log('tabs',tabs)

  return (
    <div className="tabs-container">
      <div className="tabs-header">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === 'description' && (
          <div className="description-tab">
            <div className="book-description">{book.description}</div>
          </div>
        )}
        {activeTab === 'trailers' && <TrailerList trailers={book.trailers} />}
        {activeTab === 'reviews' && <BookReviews reviews={book.reviews} />}
        {activeTab === 'series' && <SeriesSection series={book.series} />}
      </div>
    </div>
  );
};

export default Tabs;