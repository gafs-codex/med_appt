import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Notification.css';

const Notification = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [appointmentData, setAppointmentData] = useState(null);
    const [showNotification, setShowNotification] = useState(true);

    useEffect(() => {
        const storedEmail = sessionStorage.getItem('email');
        // Assuming you store appointment details in localStorage using the doctor's name as key
        const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
        const storedAppointmentData = JSON.parse(localStorage.getItem('appointmentData'));

        if (storedEmail) {
            setIsLoggedIn(true);
        }
        if (storedAppointmentData) {
            setAppointmentData(storedAppointmentData);
        }
    }, []);

    const handleCancel = () => {
        setShowNotification(false);
        localStorage.removeItem('appointmentData');
    };

    return (
        <div>
            <Navbar />
            {children}
            {isLoggedIn && appointmentData && showNotification && (
                <div className="notification-container">
                    <div className="appointment-card">
                        <h3 className="appointment-card__title">Appointment Details</h3>
                        <p><strong>Patient:</strong> {appointmentData.name}</p>
                        <p><strong>Doctor:</strong> {appointmentData.doctorName}</p>
                        <p><strong>Date:</strong> {appointmentData.date}</p>
                        <p><strong>Time:</strong> {appointmentData.time}</p>
                        <button className="cancel-btn" onClick={handleCancel}>Cancel Appointment</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Notification;