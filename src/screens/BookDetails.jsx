import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import bookService from "../services/book-service";
import BookHeader from "../components/BookHeader";
import BookTabs from "../components/BookTabs";
import ImageCarousel from "../components/ImageCarousel"
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft";
import "./BookDetails.css";
import Tabs from "../components/Tabs";
import SeriesSection from "../components/SeriesSection";
import BookReviews from "../components/BookReviews";
import TrailerList from "../components/TrailerList";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = React.useState(null);
  useEffect(() => {
    bookService.getBookById(id).then(setBook);
  },[id])
  //console.log('book', book);
  if(!book){
    return <div>Loading...</div>;
  }
  let items=[...book.covers]
  if(book.trailers && book.trailers.length > 0) {
    items = items.concat(book.trailers);
  }
  //console.log('items', items);
  return (
    <div className="book-details">
      <Link to="/books" style={{color:'black', textDecoration:'none', marginBottom:'20px'}}>
         <FontAwesomeIcon  icon={faArrowLeft} className="back-icon" /> All Books
      </Link>
      <ImageCarousel items={items} />
      <BookHeader {...book} />
      <Tabs defaultTab="description">
        <Tabs.Tab tabId="description" label="Description"
          element={<div className="book-description">{book.description}</div>}
        />
        <Tabs.Tab tabId="series-info" label="Series"
          condition={book.series!==undefined}
          element={
            <SeriesSection series={book.series} />
          }
        />
        <Tabs.Tab tabId="reviews" label="Reviews"
          condition={book.reviews!=undefined && book.reviews.length > 0}
          element={
              <BookReviews reviews={book.reviews} />          
          }
        />
        <Tabs.Tab tabId="trailers" label="Trailers"
          condition={book.trailers!=undefined && book.trailers.length > 0}
          element={
              <TrailerList trailers={book.trailers} />          
          }
        />
      </Tabs>
    </div>
  );
};

export default BookDetails;