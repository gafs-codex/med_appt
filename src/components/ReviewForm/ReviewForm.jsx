import React, { useState } from 'react';
import './ReviewForm.css';

function ReviewForm() {
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="review-form-container">
            {!showForm ? (
                <button className="review-btn" onClick={() => setShowForm(true)}>
                    Give Review
                </button>
            ) : (
                <form className="feedback-form">
                    <h3>Provide Your Feedback</h3>
                    <textarea placeholder="Write your review here..." required />
                    <input type="number" min="1" max="5" placeholder="Rating (1-5)" required />
                    <button type="submit">Submit Review</button>
                    <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
                </form>
            )}
        </div>
    );
}

export default ReviewForm;