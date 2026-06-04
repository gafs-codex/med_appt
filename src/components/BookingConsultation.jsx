import React, { useState } from 'react';
import FindDoctorSearch from '../FindDoctorSearch/FindDoctorSearch'; // Adjust paths as needed
import DoctorCard from '../DoctorCardIC/DoctorCardIC';
import './BookingConsultation.css'; // Use the CSS provided in your lab

const BookingConsultation = () => {
    const [searchQuery, setSearchQuery] = useState('');

    // Example doctor data - you can fetch this from your backend later
    const doctors = [
        { name: "Dr. Jatinkumar", speciality: "Dentist", experience: 12, ratings: "4.8" },
        { name: "Dr. Denis Rachel", speciality: "Gynecologist/obstetrician", experience: 15, ratings: "4.9" },
        { name: "Dr. Michael Wright", speciality: "General Physician", experience: 8, ratings: "4.5" }
    ];

    // Logic to filter doctors based on search input
    const filteredDoctors = doctors.filter((doc) =>
        doc.speciality.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="booking-consultation-container">
            <FindDoctorSearch onSearch={(query) => setSearchQuery(query)} />

            <div className="doctor-list">
                {filteredDoctors.map((doc, index) => (
                    <DoctorCard
                        key={index}
                        name={doc.name}
                        speciality={doc.speciality}
                        experience={doc.experience}
                        ratings={doc.ratings}
                    />
                ))}
            </div>
        </div>
    );
};

export default BookingConsultation;