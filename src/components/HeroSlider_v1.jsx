import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HeroSlider.css';

const HeroSlider = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance slides
  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, isPaused, slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const renderSlideContent = (slide) => {
    // If slide is a function, render it directly
    if (typeof slide === 'function') {
      return slide();
    }

    // Process dynamic content (functions or static values)
    const title = typeof slide.title === 'function' ? slide.title() : slide.title;
    const message = typeof slide.message === 'function' ? slide.message() : slide.message;
    let imageContent = null;

    if (typeof slide.image === 'function') {
      imageContent = slide.image();
    } else if (slide.image) {
      imageContent = <img src={slide.image} alt={title} />;
    }

    return (
      <div className="slide-content">
        {imageContent && <div className="slide-image">{imageContent}</div>}
        <div className="slide-text">
          <h3>{title}</h3>
          <p>{message}</p>
          {slide.more && (
            <Link to={typeof slide.more === 'function' ? slide.more() : slide.more}>
              <button className="slide-button">Learn More</button>
            </Link>
          )}
        </div>
      </div>
    );
  };

  return (
    <div 
      className="hero-slider"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="slider-container">
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
          >
            {renderSlideContent(slide)}
          </div>
        ))}
      </div>

      {slides.length > 1 && (
        <div className="slider-controls">
          <div className="slider-dots">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <div className="slider-arrows">
            <button 
              className="arrow prev"
              onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
              aria-label="Previous slide"
            >
              &lt;
            </button>
            <button 
              className="arrow next"
              onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
              aria-label="Next slide"
            >
              &gt;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSlider;