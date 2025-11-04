import React from 'react';
import HeroSlider from '../components/HeroSlider';
import ImageBackgroundContainer from '../components/ImageBackgroundContainer';
import Quotes from '../components/Quotes';
import BackgroundImageContainer from '../components/BackgroundImageContainer';
import quoteImage from '../data/quote-image';
import BeehiivEmbed from '../components/BeehiivEmbed';
import Script from '../components/Script';


const slides = [
  {
    title: "The Lost Epic Book 2",
    image: "/images/the-lost-epic-2-1.jpg",
    message: "Coming Soon! Preorder Now!",
    more: "/books/the-lost-epic-2"
  },
  // () => (<div
  //   style={{
  //     display: "flex",
  //     justifyContent: "center", // horizontal center
  //     alignItems: "center",     // vertical center
  //     height: "100vh",          // or your container height
  //     width: "100%"
  //   }}
  // >
  //   <BeehiivEmbed
  //     formSrc="https://subscribe-forms.beehiiv.com/c05de9f1-28cb-42e4-822b-620268a0866d"
  //     title="Subscribe to The Lost Epic Insider"
  //   />
  // </div>
  // ),

  () => <Quotes />,
  () => <Quotes />,
  () => <Quotes />,



];


//isSecureContext
const Home = () => {

  const iFrameStyle = {
    //width: "792px",
    height: 100,
    // maxHeight: 100,
    margin: 0,
    borderRaidus: "0px 0px 0px 0px !important",
    backgroundColor: "transparent",
    boxShadow: "0 0 #0000",
    maxWidth: "100%"
  };


  const style = {
    marginLeft: 20,
    marginTop: 40,
    maxWidth: "90%",
    maxHeight: "50%",
    overflow: "scroll",
    fontFamily: "script",
    fontSize: "1.2em",
    color: "#333",
    //...style
  }

  return (
    <div className="full-screen">
      {/* <BackgroundImageContainer image="7.jpg">
        <HeroSlider
          slides={slides}
          slideDelay={7000}
          height="60vh"
        />
      </BackgroundImageContainer> */}

      <div className="p5 flex-center">
        <div className="p10 flex-center">
          <h2 >Releasing Soon!</h2>
          <h3>The Lost Epic Book #2</h3>
          <p>
            As kingdoms fall to deceit and darkness, even Krishna and Bhishma cannot stop the world from quietly burning. Their battle was not against mortals, but against an entire Yuga
          </p>

          <p>
            Follow the epic story of <strong>The Lost Epic </strong>
            as Aryavart faces challenges greater than ever before.
          </p>
          

          <Script src="https://subscribe-forms.beehiiv.com/embed.js" id="beehiiv-embed-js" />
          <iframe src="https://subscribe-forms.beehiiv.com/c05de9f1-28cb-42e4-822b-620268a0866d" className="beehiiv-embed" data-test-id="beehiiv-embed" style={iFrameStyle}></iframe>
        </div>
      </div>
    </div>
  )
    ;
};

export default Home;