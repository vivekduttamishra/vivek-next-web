import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './HeroSlider.css';

const HeroSlider = ({ 
  slides, 
  slideDelay = 5000, 
  showControls = true, 
  showDots = true,
  showArrows = true,
  autoPlay = true
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slideDimensions, setSlideDimensions] = useState({ width: 0, height: 0 });

  // Set up resize observer for consistent slide dimensions
  useEffect(() => {
    const handleResize = () => {
      const slider = document.querySelector('.hero-slider');
      if (slider) {
        setSlideDimensions({
          width: slider.offsetWidth,
          height: slider.offsetHeight
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-advance slides
  useEffect(() => {
    if (!autoPlay || isPaused || slides.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, slideDelay);

    return () => clearInterval(interval);
  }, [currentSlide, isPaused, slides.length, slideDelay, autoPlay]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const renderSlideContent = (slide) => {
    if (typeof slide === 'function') {
      return (
        <div style={{ width: '100%', height: '100%' }}>
          {slide()}
        </div>
      );
    }

    const title = typeof slide.title === 'function' ? slide.title() : slide.title;
    const message = typeof slide.message === 'function' ? slide.message() : slide.message;
    let imageContent = null;

    if (typeof slide.image === 'function') {
      imageContent = slide.image();
    } else if (slide.image) {
      imageContent = (
        <img 
          src={slide.image} 
          alt={title} 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover' 
          }} 
        />
      );
    }

    return (
      <div className="slide-content">
        {imageContent && <div className="slide-image">{imageContent}</div>}
        <div className="slide-text">
          {title && <h3>{title}</h3>}
          {message && <p>{message}</p>}
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
      style={{ height: slideDimensions.height }}
    >
      <div 
        className="slider-container"
        style={{ 
          transform: `translateX(-${currentSlide * 100}%)`,
          width: `${slides.length * 100}%`
        }}
      >
        {slides.map((slide, index) => (
          <div 
            key={index}
            className="slide"
            style={{ 
              width: `${100 / slides.length}%`,
              height: '100%'
            }}
          >
            {renderSlideContent(slide)}
          </div>
        ))}
      </div>

      {slides.length > 1 && showControls && (
        <>
          {showDots && (
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
          )}

          {showArrows && (
            <div className="slider-arrows">
              <button 
                className="arrow prev"
                onClick={prevSlide}
                aria-label="Previous slide"
              >
                &lt;
              </button>
              <button 
                className="arrow next"
                onClick={nextSlide}
                aria-label="Next slide"
              >
                &gt;
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

HeroSlider.propTypes = {
  slides: PropTypes.array.isRequired,
  slideDelay: PropTypes.number,
  showControls: PropTypes.bool,
  showDots: PropTypes.bool,
  showArrows: PropTypes.bool,
  autoPlay: PropTypes.bool
};

export default HeroSlider;