import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './YouTubeGrid.css';

const YouTubeGrid = ({ playlist, apiKey, initialLoad = 8, batchSize = 8 }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  // Helper function to safely extract playlist ID
  const getPlaylistId = (url) => {
    try {
      if (url.includes('list=')) {
        return url.split('list=')[1].split('&')[0];
      }
      return url;
    } catch (e) {
      return url;
    }
  };

  // Helper function to get thumbnail URL safely
  const getThumbnailUrl = (thumbnails) => {
    return thumbnails?.medium?.url || 
           thumbnails?.high?.url || 
           thumbnails?.standard?.url || 
           thumbnails?.default?.url || 
           'https://via.placeholder.com/320x180?text=No+Thumbnail';
  };

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const playlistId = getPlaylistId(playlist);

        const response = await axios.get(
          'https://www.googleapis.com/youtube/v3/playlistItems',
          {
            params: {
              part: 'snippet',
              playlistId,
              maxResults: initialLoad,
              key: apiKey,
            },
          }
        );

        setVideos(response.data.items || []);
        setNextPageToken(response.data.nextPageToken || null);
        
      } catch (err) {
        console.error('Error fetching YouTube videos:', err);
        setError(err.message || 'Failed to load videos');
      } finally {
        setLoading(false);
      }
    };

    if (apiKey && playlist) {
      fetchVideos();
    }
  }, [playlist, apiKey, initialLoad]);

  const loadMoreVideos = async () => {
    if (!nextPageToken || isFetchingMore) return;
    
    try {
      setIsFetchingMore(true);
      
      const playlistId = getPlaylistId(playlist);

      const response = await axios.get(
        'https://www.googleapis.com/youtube/v3/playlistItems',
        {
          params: {
            part: 'snippet',
            playlistId,
            maxResults: batchSize,
            key: apiKey,
            pageToken: nextPageToken,
          },
        }
      );

      setVideos(prev => [...prev, ...(response.data.items || [])]);
      setNextPageToken(response.data.nextPageToken || null);
      
    } catch (err) {
      console.error('Error fetching more videos:', err);
      setError(err.message || 'Failed to load more videos');
    } finally {
      setIsFetchingMore(false);
    }
  };

  if (loading && videos.length === 0) {
    return <div className="youtube-loading">Loading videos...</div>;
  }

  if (error) {
    return (
      <div className="youtube-error">
        Error: {error}
        <div className="youtube-help">
          {error.includes('handle') && (
            <p>Try using channelId instead. Find it in YouTube Studio or by right-clicking your channel homepage.</p>
          )}
        </div>
      </div>
    );
  }

  if (videos.length === 0) {
    return <div className="youtube-empty">No videos found</div>;
  }

  return (
    <div className="youtube-container">
      <div className="youtube-grid">
        {videos.map((video) => {
          if (!video?.snippet) return null;
          
          return (
            <div key={video.id || video.snippet.resourceId?.videoId} className="youtube-card">
              <a
                href={`https://www.youtube.com/watch?v=${video.snippet.resourceId?.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Watch ${video.snippet.title}`}
              >
                <img
                  src={getThumbnailUrl(video.snippet.thumbnails)}
                  alt={video.snippet.title || 'YouTube video'}
                  className="youtube-thumbnail"
                  loading="lazy"
                />
                <div className="youtube-info">
                  <h3 className="youtube-title">{video.snippet.title || 'Untitled Video'}</h3>
                  <p className="youtube-description">
                    {video.snippet.description?.substring(0, 100) || ''}
                    {video.snippet.description?.length > 100 && '...'}
                  </p>
                  <p className="youtube-date">
                    {video.snippet.publishedAt ? new Date(video.snippet.publishedAt).toLocaleDateString() : ''}
                  </p>
                </div>
              </a>
            </div>
          );
        })}
      </div>
      
      {nextPageToken && (
        <div className="load-more-container">
          <button 
            className="load-more-btn"
            onClick={loadMoreVideos}
            disabled={isFetchingMore}
          >
            {isFetchingMore ? (
              <>
                <span className="spinner"></span> Loading...
              </>
            ) : (
              'Load More Videos'
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default YouTubeGrid;