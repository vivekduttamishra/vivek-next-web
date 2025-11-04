import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './BackgroundImageContainer.css';

const BackgroundImageContainer = ({
  image,
  className = '',
  children,
  fallbackImage = '/images/default.jpg',
  overlayColor = 'rgba(0, 0, 0, 0.3)'
}) => {
  const containerRef = useRef(null);
  const [orientation, setOrientation] = useState('loading');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (!containerRef.current) return;

    const calculateOrientation = (width, height) => {
      const ratio = width / height;
      if (ratio < 0.75) return 'portrait';
      if (ratio > 1.33) return 'landscape';
      return 'square';
    };

    const updateOrientation = () => {
      const { clientWidth: width, clientHeight: height } = containerRef.current;
      const newOrientation = calculateOrientation(width, height);
      setOrientation(newOrientation);
      setImageUrl(`/images/${newOrientation}/${image}`);
    };

    const observer = new ResizeObserver(updateOrientation);
    observer.observe(containerRef.current);
    updateOrientation(); // Initial call

    return () => observer.disconnect();
  }, [image]);

  const childrenWithOrientationClass = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        className: `${child.props.className || ''} ${orientation}`,
        style: {
          ...child.props.style,
          width: '100%',
          height: '100%'
        }
      });
    }
    return child;
  });

  return (
    <div 
      ref={containerRef}
      className={`background-container ${className} ${orientation}`}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative'
      }}
    >
      <div 
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl || fallbackImage})`,
          backgroundColor: '#000'
        }}
      />
      <div 
        className="content-overlay" 
        style={{ backgroundColor: overlayColor }} 
      />
      <div className="content-wrapper">
        {childrenWithOrientationClass}
      </div>
    </div>
  );
};

BackgroundImageContainer.propTypes = {
  image: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
  fallbackImage: PropTypes.string,
  overlayColor: PropTypes.string
};

export default BackgroundImageContainer;