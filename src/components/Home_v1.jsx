import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import authorImage from '../assets/author-image.png';
import latestBookCover from '../assets/shadows-of-kali-cover.png';
import './Home.css';
import ImageBackgroundContainer from './ImageBackgroundContainer';





const _Home = () => {

  const authorImageStyle = {
    backgroundImage: `url(${authorImage})`,
    //  backgroundSize: 'cover', 
    // backgroundPosition: 'center',
    // height:"100%", 
    // flex:1,

  }

  return (
    <div className="cover-container">
      <div
        className="background-image-container"
        style={authorImageStyle}
      >
        <div className="opeque">
          <div>

            <img
              src={latestBookCover}
              alt="The Shadows of Kali"
              className="book-cover-large"
            />
            <Button variant="danger" size="lg" className="mt-3" disabled>
              Coming Soon
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};


const Home = () => {
  
  const style={
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex:1,
    width:"100%",
    height:"100%",
    //padding:"50px",
    border:"1px solid red"
  }


  return (
    <div className="fill">
      <ImageBackgroundContainer imageUrl={authorImage}>
        <div style={style}>
          
          <img
              src={latestBookCover}
              alt="The Shadows of Kali"
              className="book-cover-large"
            />
            <Button variant="danger" size="lg" className="mt-3" disabled>
              Coming Soon
            </Button>
        </div>
      </ImageBackgroundContainer>
    </div>
  )
};

export default Home;