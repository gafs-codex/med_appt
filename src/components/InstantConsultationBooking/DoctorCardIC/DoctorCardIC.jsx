import React from 'react';
import './DoctorCard.css';

// Reusable individual DoctorCard Component
const DoctorCard = ({ name, speciality, experience, ratings }) => {
  return (
    <div className="doctor-card-container">
      <div className="doctor-card-details-container">
        
        <div className="doctor-card-profile-image-container">
          {/* SVG user icon scaled to fit the 120px circular bounds of the layout nicely */}
          <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="#888" className="bi bi-person-fill" viewBox="0 0 16 16"> 
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/> 
          </svg>
        </div>

        <div className="doctor-card-details">
          <div className="doctor-card-detail-name">{name}</div>
          <div className="doctor-card-detail-speciality">{speciality}</div>
          <div className="doctor-card-detail-experience">{experience} years experience</div>
          <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
          
          {/* Step 6: Appended button code placed at the last line of the details block */}
          <div style={{ marginTop: '15px' }}>
            <button className="book-appoinment-btn">
              <div>Book Appointment</div>
              <div>No Booking Fee</div>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

// Parent Component to render multiple doctors (Step 7)
const DoctorList = () => {
  const doctorsData = [
    { name: "Dr. Jatinkumar", speciality: "Dentist", experience: 12, ratings: "4.8" },
    { name: "Dr. Denis Rachel", speciality: "Gynecologist/obstetrician", experience: 15, ratings: "4.9" },
    { name: "Dr. Michael Wright", speciality: "General Physician", experience: 8, ratings: "4.5" }
  ];

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif' }}>
      <center>
        <h2 style={{ color: '#333' }}>Find a Doctor and Book an Appointment</h2>
        <p style={{ color: '#666', marginBottom: '20px' }}>{doctorsData.length} doctors available</p>
      </center>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {doctorsData.map((doctor, index) => (
          <DoctorCard 
            key={index}
            name={doctor.name}
            speciality={doctor.speciality}
            experience={doctor.experience}
            ratings={doctor.ratings}
          />
        ))}
      </div>
    </div>
  );
};

export default DoctorList;