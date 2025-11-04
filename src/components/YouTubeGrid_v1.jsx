import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './YouTubeGrid.css';

const YouTubeGrid = ({ channelId, handle, playlist, maxResults = 12, apiKey }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let url = '';
        let params = {};
        
        if (channelId) {
          // Method 1: Direct channel ID (most reliable)
          const channelResponse = await axios.get(
            'https://www.googleapis.com/youtube/v3/channels',
            {
              params: {
                part: 'contentDetails',
                id: channelId,
                key: apiKey,
              },
            }
          );
          
          if (channelResponse.data.items.length === 0) {
            throw new Error('Channel not found');
          }
          
          const uploadsPlaylistId = channelResponse.data.items[0].contentDetails.relatedPlaylists.uploads;
          
          // Get videos from uploads playlist
          url = 'https://www.googleapis.com/youtube/v3/playlistItems';
          params = {
            part: 'snippet',
            playlistId: uploadsPlaylistId,
            maxResults,
            key: apiKey,
          };
          
        } else if (handle) {
          // Method 2: Handle (@username) approach
          // First search for channel by handle
          const searchResponse = await axios.get(
            'https://www.googleapis.com/youtube/v3/search',
            {
              params: {
                part: 'snippet',
                q: handle,
                type: 'channel',
                key: apiKey,
                maxResults: 1
              },
            }
          );
          
          if (searchResponse.data.items.length === 0) {
            throw new Error(`Channel with handle @${handle} not found`);
          }
          
          const foundChannelId = searchResponse.data.items[0].snippet.channelId;
          
          // Now get the uploads playlist
          const channelResponse = await axios.get(
            'https://www.googleapis.com/youtube/v3/channels',
            {
              params: {
                part: 'contentDetails',
                id: foundChannelId,
                key: apiKey,
              },
            }
          );
          
          const uploadsPlaylistId = channelResponse.data.items[0].contentDetails.relatedPlaylists.uploads;
          
          // Get videos from uploads playlist
          url = 'https://www.googleapis.com/youtube/v3/playlistItems';
          params = {
            part: 'snippet',
            playlistId: uploadsPlaylistId,
            maxResults,
            key: apiKey,
          };
          
        } else if (playlist) {
          // Method 3: Direct playlist
          let playlistId = playlist;
          if (playlist.includes('list=')) {
            playlistId = playlist.split('list=')[1].split('&')[0];
          }
          
          url = 'https://www.googleapis.com/youtube/v3/playlistItems';
          params = {
            part: 'snippet',
            playlistId,
            maxResults,
            key: apiKey,
          };
        } else {
          throw new Error('Either channelId, handle, or playlist must be provided');
        }
        
        // Fetch videos if we have a valid URL and params
        if (url && params) {
          const videosResponse = await axios.get(url, { params });
          setVideos(videosResponse.data.items);
        }
        
      } catch (err) {
        console.error('Error fetching YouTube videos:', err);
        setError(err.message || 'Failed to load videos');
      } finally {
        setLoading(false);
      }
    };

    if (apiKey && (channelId || handle || playlist)) {
      fetchVideos();
    }
  }, [channelId, handle, playlist, maxResults, apiKey]);

  if (loading) {
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
    <div className="youtube-grid">
      {videos.map((video) => (
        <div key={video.id || video.snippet.resourceId.videoId} className="youtube-card">
          <a
            href={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Watch ${video.snippet.title}`}
          >
            <img
              src={video.snippet.thumbnails.medium?.url || video.snippet.thumbnails.default.url}
              alt={video.snippet.title}
              className="youtube-thumbnail"
              loading="lazy"
            />
            <div className="youtube-info">
              <h3 className="youtube-title">{video.snippet.title}</h3>
              <p className="youtube-description">
                {video.snippet.description.substring(0, 100)}
                {video.snippet.description.length > 100 && '...'}
              </p>
              <p className="youtube-date">
                {new Date(video.snippet.publishedAt).toLocaleDateString()}
              </p>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
};

export default YouTubeGrid;