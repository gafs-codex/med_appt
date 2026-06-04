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
            setUsername(email.split('@')[0]);
        }
    }, []);

    const handleLogout = () => {
        sessionStorage.clear();
        setIsLoggedIn(false);
        navigate("/login");
        window.location.reload();
    };

    return (
        <nav>
            <div className="nav__logo">
                <Link to="/">StayHealthy</Link>
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
                                <Link to="/reports">Your Reports</Link>
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