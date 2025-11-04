import PodcastList from "../components/PodcastList";
import config from "../data/config.js";

const Podcasts=()=> {


  return (
    <div className="p10">
      <h2>Mahabharata Ek Khoj</h2>
      <PodcastList rssUrl={config.MAHABHARATA_EK_KHOJ_PODCAST_RSS} />
    </div>
  )

}

export default Podcasts;