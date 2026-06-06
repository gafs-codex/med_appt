import React, { useState } from 'react';
import './Sign_Up.css';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Sign_Up = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};

        if (!name.trim()) {
            newErrors.name = "Name is required";
        } else if (name.trim().length < 2) {
            newErrors.name = "Name must be at least 2 characters";
        }

        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Enter a valid email address";
        }

        if (!phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^\+?[0-9]{7,15}$/.test(phone.replace(/\s/g, ''))) {
            newErrors.phone = "Enter a valid phone number";
        }

        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        } else if (!/[A-Z]/.test(password)) {
            newErrors.password = "Password must contain at least one uppercase letter";
        } else if (!/[0-9]/.test(password)) {
            newErrors.password = "Password must contain at least one number";
        }

        if (!confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (confirmPassword !== password) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        return newErrors;
    };

    const register = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, phone }),
            });

            const json = await response.json();

            if (response.ok && json.authtoken) {
                sessionStorage.setItem("auth-token", json.authtoken);
                sessionStorage.setItem("name", name);
                sessionStorage.setItem("phone", phone);
                sessionStorage.setItem("email", email);
                navigate("/");
                window.location.reload();
            } else {
                if (json.errors) {
                    const serverErrors = {};
                    json.errors.forEach(err => {
                        serverErrors.server = err.msg;
                    });
                    setErrors(serverErrors);
                } else if (json.error) {
                    setErrors({ server: typeof json.error === 'object' ? JSON.stringify(json.error) : json.error });
                } else {
                    setErrors({ server: "Registration failed. Email or phone may already be registered." });
                }
            }
        } catch (networkError) {
            setErrors({ server: "Network error. Could not connect to the server." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container" style={{ marginTop: '5%' }}>
            <div className="signup-grid">
                <div className="signup-form">

                    {/* Server error */}
                    {errors.server && (
                        <div style={{ color: 'red', marginBottom: '10px', fontSize: '14px' }}>
                            {errors.server}
                        </div>
                    )}

                    <form method="POST" onSubmit={register} noValidate>

                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
                                }}
                                type="text"
                                name="name"
                                id="name"
                                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                placeholder="Enter your name"
                                required
                            />
                            {errors.name && (
                                <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                                    {errors.name}
                                </div>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                                }}
                                type="email"
                                name="email"
                                id="email"
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                placeholder="Enter your email"
                                required
                            />
                            {errors.email && (
                                <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                                    {errors.email}
                                </div>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input
                                value={phone}
                                onChange={(e) => {
                                    setPhone(e.target.value);
                                    if (errors.phone) setErrors(prev => ({ ...prev, phone: '' }));
                                }}
                                type="tel"
                                name="phone"
                                id="phone"
                                className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                placeholder="Enter your phone number"
                                required
                            />
                            {errors.phone && (
                                <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                                    {errors.phone}
                                </div>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
                                }}
                                type="password"
                                name="password"
                                id="password"
                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                placeholder="Enter your password"
                                required
                            />
                            {errors.password && (
                                <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                                    {errors.password}
                                </div>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    if (errors.confirmPassword) setErrors(prev => ({ ...prev, confirmPassword: '' }));
                                }}
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                placeholder="Confirm your password"
                                required
                            />
                            {errors.confirmPassword && (
                                <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
                                    {errors.confirmPassword}
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ marginTop: '15px' }}
                            disabled={loading}
                        >
                            {loading ? 'Creating account...' : 'Sign Up'}
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default Sign_Up;