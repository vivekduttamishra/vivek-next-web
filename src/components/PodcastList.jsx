import { useState, useEffect } from 'react';
import podcastService from '../services/podcast-service';
import './PodcastList.css'; // Assuming you have some basic styles for the component

const PodcastList = ({ rssUrl = 'https://anchor.fm/s/your-podcast-id/feed' }) => {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const episodes = await podcastService.getPodcasts(rssUrl);
        setPodcasts(episodes);
      } catch (err) {
        setError(err.message || 'Failed to load podcasts');
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, [rssUrl]);

  if (loading) return <div className="loading">Loading podcasts...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!podcasts.length) return <div className="empty">No podcasts found</div>;

  return (
    <div className="podcast-list">
      <h2>Latest Episodes</h2>
      <div className="episodes">
        {podcasts.map((podcast, index) => (
          <div key={`${podcast.title}-${index}`} className="episode">
            <h3>{podcast.title}</h3>
            <p className="date">
              {podcast.date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            {podcast.imageUrl && (
              <img src={podcast.imageUrl} alt={podcast.title} className="episode-image" />
            )}           

            {/* Only render audio player if audioUrl exists */}
            {podcast.audioUrl && (
              <div className="audio-player">
                <audio controls>
                  <source src={podcast.audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            )}
            {/* <p className="description long-text" dangerouslySetInnerHTML={{__html:podcast.description}}></p> */}

            {/* <div className="platform-links">
              <span>Available on:</span>
              {podcast.platforms.spotify && (
                <a href={podcast.platforms.spotify} target="_blank" rel="noopener noreferrer">
                  Spotify
                </a>
              )}
              {podcast.platforms.apple && (
                <a href={podcast.platforms.apple} target="_blank" rel="noopener noreferrer">
                  Apple Podcasts
                </a>
              )}
              {podcast.platforms.amazon && (
                <a href={podcast.platforms.amazon} target="_blank" rel="noopener noreferrer">
                  Amazon
                </a>
              )}
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PodcastList;