import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './NotFoundPage.css'; 

function NotFoundPage() {
  const location = useLocation();
  const attemptedPath = location.pathname;
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("https://formspree.io/f/thelostepeicseries+404@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          attemptedPath: attemptedPath,
          feedback: feedback,
          type: '404-feedback',
          timestamp: new Date().toISOString()
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFeedback('');
        setTimeout(() => navigate('/'), 2000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="not-found-container">
      <h1>Not Found</h1>
      <p>Sorry, the page you were looking for (<code>{attemptedPath}</code>) doesn't exist.</p>
      
      {/* <div className="suggestions">
        <p>You might want to:</p>
        <ul>
          <li><button onClick={() => navigate('/')}>Go to the home page</button></li>
          <li><a href="mailto:thelostepeicseries+404@gmail.com">Contact me directly</a></li>
        </ul>
      </div> */}
      
      <form onSubmit={handleSubmit} className="feedback-form">
        <h3>Help me improve</h3>
        <p>What were you looking for?</p>
        
        <div className="form-group">
          <label htmlFor="feedback">Your feedback:</label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder={`I was trying to access ${attemptedPath} to find...`}
            required
          />
        </div>
        
        <input 
          type="hidden" 
          name="attemptedPath" 
          value={attemptedPath} 
        />
        
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Feedback'}
        </button>
        
        {submitStatus === 'success' && (
          <p className="success-message">Thank you! Your feedback has been submitted.</p>
        )}
        {submitStatus === 'error' && (
          <p className="error-message">Something went wrong. Please try again later.</p>
        )}
      </form>
    </div>
  );
}

export default NotFoundPage;