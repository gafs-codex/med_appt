import React, { useEffect, useState } from "react";
import { API_URL } from "../../config"; // Ensure your config file exports API_URL
import { useNavigate } from "react-router-dom";
import './ProfileCard.css';

const ProfileCard = () => {
    const [userDetails, setUserDetails] = useState({ name: '', phone: '', email: '' });
    const [updatedDetails, setUpdatedDetails] = useState({ name: '', phone: '', email: '' });
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const authtoken = sessionStorage.getItem("auth-token");
        if (!authtoken) {
            navigate("/login");
        } else {
            fetchUserProfile();
        }
    }, [navigate]);

    const fetchUserProfile = async () => {
        try {
            const authtoken = sessionStorage.getItem("auth-token");
            const email = sessionStorage.getItem("email");
            const response = await fetch(`${API_URL}/api/auth/user`, {
                headers: { "Authorization": `Bearer ${authtoken}`, "Email": email },
            });
            if (response.ok) {
                const user = await response.json();
                setUserDetails(user);
                setUpdatedDetails(user);
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    const handleEdit = () => setEditMode(true);

    const handleInputChange = (e) => {
        setUpdatedDetails({ ...updatedDetails, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const authtoken = sessionStorage.getItem("auth-token");
        const email = sessionStorage.getItem("email");

        const response = await fetch(`${API_URL}/api/auth/user`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${authtoken}`,
                "Content-Type": "application/json",
                "Email": email,
            },
            body: JSON.stringify(updatedDetails),
        });

        if (response.ok) {
            setUserDetails(updatedDetails);
            setEditMode(false);
            alert(`Profile Updated Successfully!`);
        }
    };

    return (
        <div className="profile-container">
            {editMode ? (
                <form onSubmit={handleSubmit}>
                    <label>Email: <input type="email" name="email" value={updatedDetails.email} disabled /></label>
                    <label>Name: <input type="text" name="name" value={updatedDetails.name} onChange={handleInputChange} /></label>
                    <label>Phone: <input type="text" name="phone" value={updatedDetails.phone} onChange={handleInputChange} /></label>
                    <button type="submit">Save</button>
                </form>
            ) : (
                <div className="profile-details">
                    <h1>Welcome, {userDetails.name}</h1>
                    <p><b>Email:</b> {userDetails.email}</p>
                    <p><b>Phone:</b> {userDetails.phone}</p>
                    <button onClick={handleEdit}>Edit</button>
                </div>
            )}
        </div>
    );
};

export default ProfileCard;