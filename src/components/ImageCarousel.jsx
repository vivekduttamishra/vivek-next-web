import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ImageCarousel.css';

const ImageCarousel = ({ items }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const isYouTubeUrl = (url) => {
    return url?.includes('youtube.com') || url?.includes('youtu.be');
  };

  const extractVideoId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    centerMode: true,
    centerPadding: '0',
    adaptiveHeight: true,
    beforeChange: () => {
      // Pause any playing videos when changing slides
      const iframes = document.querySelectorAll('iframe');
      iframes.forEach(iframe => {
        //iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      });
    }
  };

  const renderSlideContent = (item, index) => {
    if (isYouTubeUrl(item)) {
      const videoId = extractVideoId(item);
      if (!videoId) return <div className="error-placeholder">Invalid YouTube URL</div>;

      return (
        <div className="video-slide">
          <div className="video-container">
            {isMounted && (
              <iframe
                key={`video-${index}`}
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1`}
                title={`YouTube video ${index + 1}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="image-slide">
        <img 
          src={item} 
          alt={`Slide ${index + 1}`} 
          className="slider-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'placeholder.jpg';
          }}
        />
      </div>
    );
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {items.map((item, index) => (
          <div key={index} className="slider-item">
            {renderSlideContent(item, index)}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;