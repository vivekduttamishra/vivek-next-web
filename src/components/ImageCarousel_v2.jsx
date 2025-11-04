import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ImageCarousel.css';

const ImageCarousel = ({ covers }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    centerMode: true, // Add this line
    centerPadding: '0', // Add this line
    adaptiveHeight: true // Optional: adjusts height to current slide
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {covers.map((cover, index) => (
          <div key={index} className='slider-container'>
            <img 
              src={cover} 
              alt={`Book cover ${index + 1}`} 
              className='slider-image'
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;