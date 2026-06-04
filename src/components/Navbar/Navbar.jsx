import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const [iconActive, setIconActive] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("auth-token");
        const email = sessionStorage.getItem("email");

        if (token && email) {
            setIsLoggedIn(true);
            const extractedName = email.split('@')[0];
            setUsername(extractedName);
        }
    }, []);

    const handleClick = () => {
        setIconActive(!iconActive);
    };

    const handleLogout = () => {
        sessionStorage.clear();
        setIsLoggedIn(false);
        setUsername('');
        navigate("/login");
        window.location.reload();
    };

    return (
        <nav>
            <div className="nav__logo">
                <Link to="/">
                    StayHealthy
                    <svg xmlns="http://www.w3.org/2000/svg" height="26" width="26" viewBox="0 0 1000 1000" style={{ fill: '#3685fb' }}>
                        <path d="M499.8,10c91.7,0,166,74.3,166,166c0,91.7-74.3,166-166,166c-91.7,0-166-74.3-166-166C333.8,84.3,408.1,10,499.8,10z" />
                        <path d="M499.8,522.8c71.2,0,129.1-58.7,129.1-129.1H370.6C370.6,464.1,428.6,522.8,499.8,522.8z" />
                    </svg>
                </Link>
            </div>

            <div className="nav__icon" onClick={handleClick}>
                <i className={`fa ${iconActive ? 'fa-times' : 'fa-bars'}`}></i>
            </div>

            <ul className={`nav__links ${iconActive ? 'active' : ''}`}>
                <li className="link"><Link to="/">Home</Link></li>
                <li className="link"><Link to="/instant-consultation">Appointments</Link></li>

                {isLoggedIn ? (
                    <li className="link">
                        <div className="profile-dropdown">
                            <button className="dropbtn">{username}</button>
                            <div className="dropdown-content">
                                <Link to="/profile">My Profile</Link>
                                <button onClick={handleLogout}>Logout</button>
                            </div>
                        </div>
                    </li>
                ) : (
                    <>
                        <li className="link"><Link to="/signup"><button className="btn1">Sign Up</button></Link></li>
                        <li className="link"><Link to="/login"><button className="btn1">Login</button></Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;