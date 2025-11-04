import React, { useState, useEffect } from 'react';
import './MahabharataQuery.css';
import { Link } from 'react-router-dom';
import mahabharataService from '../services/mahabharata-service';

// Updated data structure
// const categories = [
//   {
//     id: "event-validation",
//     label: "Event Validation",
//     examples: [
//       {
//         question: "Did Draupadi actually laugh at Duryodhana?",
//         link: "https://example.com/draupadi-laugh-myth"
//       },
//       {
//         question: "Was Abhimanyu really 16 during the Chakravyuha incident?",
//         link: null
//       }
//     ]
//   },
//   {
//     id: "character-analysis",
//     label: "Character Analysis",
//     examples: [
//       {
//         question: "Was Karna truly the most generous person?",
//         link: "https://example.com/karna-danveer-analysis"
//       }
//     ]
//   }
// ];

const MahabharataQuery = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        questionType: '',
        question: ''
    });
    const [status, setStatus] = useState('');
    const [currentExamples, setCurrentExamples] = useState([]);
    const [currentPlaceholder, setCurrentPlaceholder] = useState('');
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        mahabharataService.getCategories().then(setCategories);
    }, []);

    // Update placeholder when question type changes
    useEffect(() => {
        if (formData.questionType && currentExamples.length > 0) {
            const randomExample = currentExamples[
                Math.floor(Math.random() * currentExamples.length)
            ].question;
            setCurrentPlaceholder(`e.g. ${randomExample}`);
        } else {
            setCurrentPlaceholder('Enter your detailed question...');
        }
    }, [formData.questionType, currentExamples]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleTypeChange = (e) => {
        const selectedId = e.target.value;
        const category = categories.find(c => c.id === selectedId);

        setFormData(prev => ({ ...prev, questionType: selectedId }));
        setCurrentExamples(category?.examples || []);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const response = await fetch("https://formspree.io/f/thelostepeicseries+mahabharata@gmail.com", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    _subject: `Mahabharata Query: ${formData.questionType}`,
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    question_type: categories.find(c => c.id === formData.questionType)?.label,
                    question: formData.question
                })
            });

            if (response.ok) {
                setStatus('success');
                setFormData({
                    ...formData,
                    question: ''
                });
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <div className="mahabharata-query p10">
            <header>
                <h2>Mahabharata Clarifications</h2>
                <p>Do you have a question related to Mahabharata? Confused about if a given incident is valid as per authentic references or an interpoloation?</p>
                <p>You can checkout our <Link to="/mahabharata/faq">Mahabharata FAQ</Link> or ask your questions here</p>
            </header>

            <form onSubmit={handleSubmit}>
                {/* User Information */}
                <div className="form-section">
                    <h3>Your Details</h3>
                    <div className="form-group">
                        <label>Name*</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Arjuna Pandava"
                        />
                    </div>

                    <div className="form-group">
                        <label>Email*</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="arjuna@hastinapur.com"
                        />
                    </div>

                    <div className="form-group">
                        <label>Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="(Optional)"
                        />
                    </div>
                </div>

                {/* Question Section */}
                <div className="form-section">
                    <h3>Your Question</h3>
                    <div className="form-group">
                        <label>Question Type*</label>
                        <select
                            name="questionType"
                            value={formData.questionType}
                            onChange={handleTypeChange}
                            required
                        >
                            <option value="" disabled>Select a category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.label}</option>
                            ))}
                        </select>
                    </div>
                    {/* Examples Section */}
                    {currentExamples.length > 0 && (
                        <div className="form-group">
                            <label>Related Questions</label>
                            <ul className="examples-list">
                                {currentExamples.map((example, index) => (
                                    <li key={index}>
                                        {example.link ? (
                                            <a href={example.link} target="_blank" rel="noopener noreferrer">
                                                {example.question}
                                            </a>
                                        ) : (
                                            <span>{example.question}</span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="form-group">
                        <label>Your Question*</label>
                        <textarea
                            name="question"
                            value={formData.question}
                            onChange={handleChange}
                            required
                            rows={5}
                            placeholder={currentPlaceholder}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="submit-btn"
                >
                    {status === 'submitting' ? 'Submitting...' : 'Submit Question'}
                </button>

                {status === 'success' && (
                    <div className="status-message success">
                        Thank you! We'll respond with textual references.
                    </div>
                )}

                {status === 'error' && (
                    <div className="status-message error">
                        Submission failed. Please try again or email directly.
                    </div>
                )}
            </form>


        </div>
    );
};

export default MahabharataQuery;