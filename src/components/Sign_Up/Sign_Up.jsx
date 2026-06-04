import React, { useState } from 'react';
import './Sign_Up.css';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Sign_Up = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState('');
    const navigate = useNavigate();

    // Copy and paste this exact updated block over your current register function:
    const register = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    phone: phone,
                }),
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
                    const messages = json.errors.map(err => err.msg).join("\n");
                    alert("Validation Errors:\n" + messages);
                    setShowerr(json.errors[0].msg);
                } else if (json.error) {
                    // Unpacks the [object Object] problem cleanly here
                    const targetError = typeof json.error === 'object' ? JSON.stringify(json.error) : json.error;
                    alert("Server Error: " + targetError);
                    setShowerr(targetError);
                } else {
                    alert("Registration failed. Email or phone number might already be registered.");
                    setShowerr("Registration failed.");
                }
            }
        } catch (networkError) {
            console.error("Fetch path connection broken:", networkError);
            alert("Network Error: Could not connect to the authentication server at " + API_URL);
        }
    };

    return (
        <div className="container" style={{ marginTop: '5%' }}>
            <div className="signup-grid">
                <div className="signup-form">
                    <form method="POST" onSubmit={register}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input value={name} type="text" onChange={(e) => setName(e.target.value)} name="name" id="name" className="form-control" placeholder="Enter your name" aria-describedby="helpId" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="form-control" placeholder="Enter your email" aria-describedby="helpId" required />
                            {showerr && <div className="err" style={{ color: 'red', marginTop: '5px' }}>{showerr}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" name="phone" id="phone" className="form-control" placeholder="Enter your phone number" aria-describedby="helpId" required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" className="form-control" placeholder="Enter your password" aria-describedby="helpId" required />
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ marginTop: '15px' }}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Sign_Up;