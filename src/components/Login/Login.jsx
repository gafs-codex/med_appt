import React, { useState } from 'react';
import './Login.css';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        let formErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!formData.email) {
            formErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            formErrors.email = "Invalid email format";
        }

        if (!formData.password) {
            formErrors.password = "Password is required";
        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Login Form Submitted Successfully", formData);
            // Authentication endpoint connection goes here
        }
    };

    return (
        <div className="container">
            <div className="login-grid">
                <div className="login-text">
                    <h1>Login</h1>
                    <p>Are you a new member? <a href="/signup" style={{ color: '#2196f3' }}> Sign Up Here</a></p>
                </div>
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="form-control" placeholder="Enter your email" />
                        {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} className="form-control" placeholder="Enter your password" />
                        {errors.password && <span className="error-text">{errors.password}</span>}
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;