import React, { useState } from 'react';
import './ReviewForm.css';

function ReviewForm() {
    const [showForm, setShowForm] = useState(false);
    const [submittedData, setSubmittedData] = useState(null);
    const [formData, setFormData] = useState({ name: '', review: '', rating: 0 });
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const handleButtonClick = () => {
        setShowForm(true);
        setIsButtonDisabled(true); // Disable button after opening the form
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmittedData(formData);
        setShowForm(false);
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
                    <h2>Give Your Feedback</h2>
                    <input name="name" placeholder="Your Name" onChange={handleChange} required />
                    <textarea name="review" placeholder="Your Review" onChange={handleChange} required />
                    
                    {/* Rating Selector 1-5 */}
                    <div className="rating-selector">
                        <label>Rating:</label>
                        {[1, 2, 3, 4, 5].map((num) => (
                            <button 
                                type="button" 
                                key={num} 
                                onClick={() => setFormData({...formData, rating: num})}
                                style={{ backgroundColor: formData.rating === num ? 'gold' : 'white' }}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                    <button type="submit">Submit</button>
                </form>
            )}

            {submittedData && (
                <div className="submitted-review">
                    <h3>Review Submitted!</h3>
                    <p><strong>Name:</strong> {submittedData.name}</p>
                    <p><strong>Rating:</strong> {submittedData.rating}/5</p>
                    <p><strong>Review:</strong> {submittedData.review}</p>
                </div>
            )}
        </div>
    );
}

export default ReviewForm;