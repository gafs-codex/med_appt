import React, { useState } from 'react';
import './DoctorCardIC.css';
import AppointmentFormIC from '../AppointmentFormIC/AppointmentFormIC';
const DoctorCard = ({ name, speciality, experience, ratings }) => {
  const [showForm, setShowForm] = useState(false);
  const [appointmentData, setAppointmentData] = useState(null);

  const handleBooking = (formData) => {
    setAppointmentData(formData);
    setShowForm(false);
  };

  const handleCancel = () => {
    setAppointmentData(null);
  };

  return (
    <div className="doctor-card-container">
      <div className="doctor-card-details-container">
        <div className="doctor-card-profile-image-container">
          <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="#888" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          </svg>
        </div>

        <div className="doctor-card-details">
          <div className="doctor-card-detail-name">{name}</div>
          <div className="doctor-card-detail-speciality">{speciality}</div>
          <div className="doctor-card-detail-experience">{experience} years experience</div>
          <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>

          {/* Booking / Cancel Logic */}
          <div className="doctor-card-options-container" style={{ marginTop: '15px' }}>
            {appointmentData ? (
              <div className="appointment-booked">
                <p>Appointment booked for {appointmentData.appointmentDate} at {appointmentData.selectedSlot}</p>
                <button className="btn btn-danger" onClick={handleCancel}>Cancel Appointment</button>
              </div>
            ) : (
              <button className="book-appoinment-btn" onClick={() => setShowForm(!showForm)}>
                {showForm ? "Cancel Booking" : "Book Appointment"}
              </button>
            )}
          </div>

          {showForm && (
            <AppointmentForm
              doctorName={name}
              doctorSpeciality={speciality}
              onSubmit={handleBooking}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// Keep your existing DoctorList component below
export default DoctorCard;