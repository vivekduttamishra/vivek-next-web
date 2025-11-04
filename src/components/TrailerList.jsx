import React from 'react';

const TrailerList = ({ trailers }) => {
  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <div className="trailer-list">
      {trailers.map((trailer, index) => {
        const videoId = getYouTubeId(trailer);
        return (
          <div key={index} className="trailer-item">
            {videoId ? (
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title={`Trailer ${index + 1}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <p>Invalid YouTube URL</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TrailerList;