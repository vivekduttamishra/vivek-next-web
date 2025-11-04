
import quotes from '../data/quotes'
import ImageBackgroundContainer from './ImageBackgroundContainer';
import './Quotes.css'

const Quotes = () => {

    //select a random quote from the quotes array
    const getRandomQuote = () => {
        return quotes[Math.floor(Math.random() * quotes.length)];
    };

    const quote = getRandomQuote();
    quote.quote = quote.quote.replace("\n", "<br/>"); // Replace <br> tags with spaces
    //console.log('quote.quote', quote.quote);
    return (
        <div className="quote">
             {quote.image && 
                <div className="quotes-left">
                <img src={quote.image} alt={quote.author} className="quote-image" />
                </div>
            }
            <div className="quotes-right">


                <div className="quote-text">
                    <p dangerouslySetInnerHTML={{ __html: quote.quote }}></p>
                    <p className="quote-author">- {quote.author}</p>
                </div>
                {quote.link && quote.source && <a href={quote.link} target="_blank" rel="noopener noreferrer" className="button">{quote.source}</a>}
                {quote.source && !quote.link && <span className="quote-source">source: {quote.source}</span>}
            </div>

        </div>
    );
}

export default Quotes;