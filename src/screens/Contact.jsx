import React, { useState } from 'react';
import './Contact.css'; // We'll create this CSS file next

const Contact = () => {
  const [status, setStatus] = useState('');
  const [purpose, setPurpose] = useState('');

  const submitForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    
    fetch(form.action, {
      method: 'POST',
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        setStatus('SUCCESS');
        form.reset();
      } else {
        throw new Error('Network response was not ok');
      }
    })
    .catch(() => setStatus('ERROR'));
  };

  return (
    <div className="contact-container">
      <h2>Get In Touch</h2>
      <form 
        onSubmit={submitForm}
        action={`https://formspree.io/f/thelostepeicseries+contact@gmail.com`}
        method="POST"
      >
        {/* Dynamic Subject Line */}
        <input 
          type="hidden" 
          name="_subject" 
          value={`New ${purpose || 'Contact'} Submission - The Lost Epic Series`} 
        />
        
        {/* HoneyPot for Spam */}
        <input type="text" name="_gotcha" style={{display: 'none'}} />

        <div className="form-group">
          <label htmlFor="name">Name*</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            required 
            placeholder="Your name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email*</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required 
            placeholder="your@email.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input 
            type="tel" 
            id="phone" 
            name="phone" 
            placeholder="(optional)"
          />
        </div>

        <div className="form-group">
          <label htmlFor="purpose">Purpose*</label>
          <select 
            id="purpose" 
            name="purpose" 
            required
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          >
            <option value="" disabled>Select an option</option>
            <option value="Feedback/Review">Feedback/Review</option>
            <option value="Collaboration">Collaboration Request</option>
            <option value="Interview">Talk/Interview Invitation</option>
            <option value="Other">Other Inquiry</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="message">Message*</label>
          <textarea 
            id="message" 
            name="message" 
            rows="5" 
            required 
            placeholder="Your message here..."
          />
        </div>

        <button type="submit" className="submit-btn">
          Send Message
        </button>

        {status === 'SUCCESS' && (
          <p className="success-msg">Thank you! Your message has been sent.</p>
        )}
        {status === 'ERROR' && (
          <p className="error-msg">Oops! There was an error. Please try again.</p>
        )}
      </form>
    </div>
  );
};

export default Contact;