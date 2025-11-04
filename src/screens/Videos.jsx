import YouTubeGrid from '../components/YouTubeGrid.jsx';
import config from '../data/config.js';
const Videos = ({playlist=config.MAHABHARATA_EK_KHOJ_PLAYLIST_ID}) => {


  return (
    <div className="p10">
      <h2>Mahabharata Ek Khoj</h2>
      <YouTubeGrid
        playlist={playlist}
        initialLoad={8}     // Number of videos to load initially
        batchSize={8}       // Number of videos to load with each "Load More" click
        apiKey={config.YOUTUBE_API_KEY}
      />
    </div>
  )


}

export default Videos;