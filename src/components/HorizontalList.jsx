import React from 'react';
import './HorizontalList.css';

const HorizontalList = ({ 
  title, 
  items, 
  renderItem, 
  className = '', 
  style = {},
  minItemWidth = 150,
  maxItemWidth = 200,
  gap = 20
}) => {
  return (
    <div 
      className={`horizontal-list-container ${className}`} 
      style={style}
    >
      <h2 className="horizontal-list-title">{title}</h2>
      <div 
        className="horizontal-list-scroller"
        style={{
          '--min-item-width': `${minItemWidth}px`,
          '--max-item-width': `${maxItemWidth}px`,
          '--gap': `${gap}px`
        }}
      >
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