import React from 'react';
import './HorizontalList.css';

/**
 * A generic horizontal scrollable list component
 * 
 * @param {string} title - The title displayed above the list (h2)
 * @param {Array} items - Array of items to render
 * @param {function} renderItem - Function to render each item
 * @param {string} [className] - Optional additional className for the container
 * @param {object} [style] - Optional additional styles for the container
 */
const HorizontalList = ({ title, items, renderItem, className = '', style = {} }) => {
  return (
    <div 
      className={`horizontal-list-container ${className}`} 
      style={style}
    >
      <h2 className="horizontal-list-title">{title}</h2>
      <div className="horizontal-list-scroller">
        {items.map((item, index) => (
          <div key={index} className="horizontal-list-item">
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalList;