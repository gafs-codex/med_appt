import React, { useState } from 'react';
import './ReviewForm.css';

function ReviewForm() {
    const [showForm, setShowForm] = useState(false);
    const [submittedData, setSubmittedData] = useState(null);
    const [formData, setFormData] = useState({ name: '', review: '', rating: 0 });
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [hoveredStar, setHoveredStar] = useState(0);

    const handleButtonClick = () => {
        setShowForm(true);
        setIsButtonDisabled(true);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.rating === 0) {
            alert('Please select a rating');
            return;
        }
        setSubmittedData(formData);
        setShowForm(false);
    };

    const renderStars = (rating) => {
        return [1, 2, 3, 4, 5].map((num) => (
            <span key={num} style={{ fontSize: '22px' }}>
                {num <= rating ? '⭐' : '☆'}
            </span>
        ));
    };

    return (
        <div className="review-form-container">
            {!submittedData && (
                <button
                    className="review-btn"
                    onClick={handleButtonClick}
                    disabled={isButtonDisabled}
                >
                    Click Here
                </button>
            )}

            {showForm && (
                <form className="feedback-form" onSubmit={handleSubmit}>
                    <h2>Give Your Review</h2>

                    <div className="form-field">
                        <label htmlFor="name">Name:</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter your name"
                            onChange={handleChange}
                            value={formData.name}
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label htmlFor="review">Review:</label>
                        <textarea
                            id="review"
                            name="review"
                            placeholder="Write your review here"
                            onChange={handleChange}
                            value={formData.review}
                            required
                        />
                    </div>

                    <div className="form-field">
                        <label>Rating:</label>
                        <div className="star-rating">
                            {[1, 2, 3, 4, 5].map((num) => (
                                <span
                                    key={num}
                                    className="star"
                                    onClick={() => setFormData({ ...formData, rating: num })}
                                    onMouseEnter={() => setHoveredStar(num)}
                                    onMouseLeave={() => setHoveredStar(0)}
                                >
                                    {num <= (hoveredStar || formData.rating) ? '⭐' : '☆'}
                                </span>
                            ))}
                        </div>
                    </div>

                    <button type="submit" className="submit-btn">Submit</button>
                </form>
            )}

            {submittedData && (
                <div className="submitted-review">
                    <h3>Review Submitted!</h3>
                    <p><strong>Name:</strong> {submittedData.name}</p>
                    <p><strong>Rating:</strong> {renderStars(submittedData.rating)}</p>
                    <p><strong>Review:</strong> {submittedData.review}</p>
                </div>
            )}
        </div>
    );
}

export default ReviewForm;