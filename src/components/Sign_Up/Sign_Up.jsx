import React, { useState } from 'react';
import './Sign_Up.css';

function Sign_Up() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        let formErrors = {};
        if (!formData.name.trim()) formErrors.name = "Name is required";

        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            formErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            formErrors.email = "Invalid email format";
        }

        // Phone number validation rule (Must be exactly 10 digits)
        const phoneRegex = /^\d{10}$/;
        if (!formData.phone) {
            formErrors.phone = "Phone number is required";
        } else if (!phoneRegex.test(formData.phone)) {
            formErrors.phone = "Phone number must be exactly 10 digits";
        }

        if (!formData.password) {
            formErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            formErrors.password = "Password must be at least 6 characters";
        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Sign Up Form Submitted Successfully", formData);
            // Form submission logic to backend API goes here
        }
    };

    return (
        <div className="container">
            <div className="signup-grid">
                <div className="signup-text">
                    <h1>Sign Up</h1>
                    <p>Already a member? <a href="/login" style={{ color: '#2196f3' }}> Login</a></p>
                </div>
                <form onSubmit={handleSubmit} className="signup-form">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="form-control" placeholder="Enter your name" />
                        {errors.name && <span className="error-text">{errors.name}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="form-control" placeholder="Enter your email" />
                        {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className="form-control" placeholder="Enter 10-digit mobile number" />
                        {errors.phone && <span className="error-text">{errors.phone}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} className="form-control" placeholder="Create a password" />
                        {errors.password && <span className="error-text">{errors.password}</span>}
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Sign_Up;