import React, { useState } from 'react';
import './FindDoctorSearchIC.css';
import { useNavigate } from 'react-router-dom';

const initSpeciality = [
    'Dentist', 'Gynecologist/obstetrician', 'General Physician', 'Dermatologist', 'Ear-nose-throat (ent) Specialist', 'Homeopath', 'Ayurveda'
];

const FindDoctorSearch = ({ disabled = false }) => {
    const [doctorResultHidden, setDoctorResultHidden] = useState(true);
    const [searchDoctor, setSearchDoctor] = useState('');
    const [specialities, setSpecialities] = useState(initSpeciality);
    const navigate = useNavigate();

    const handleDoctorSelect = (speciality) => {
        if (disabled) return;
        setSearchDoctor(speciality);
        setDoctorResultHidden(true);
        navigate(`/instant-consultation?speciality=${speciality}`);
        window.location.reload();
    };

    const handleSearchChange = (e) => {
        if (disabled) return;
        const query = e.target.value;
        setSearchDoctor(query);
        const filtered = initSpeciality.filter(speciality =>
            speciality.toLowerCase().includes(query.toLowerCase())
        );
        setSpecialities(filtered);
    };

    return (
        <div className='finddoctor'>
            <h1 style={{ textAlign: 'center' }}>Find a doctor and Consult instantly</h1>
            <div style={{ textAlign: 'center' }}>
                <i style={{ color: '#3685fb', fontSize: '20rem' }} className="fa fa-user-md"></i>
            </div>

            <div className="home-search-container">
                <div className="doctor-search-box">
                    <input
                        type="text"
                        className="search-doctor-input-box"
                        placeholder={disabled ? "Search unavailable" : "Search doctors, clinics, hospitals, etc."}
                        value={searchDoctor}
                        onChange={handleSearchChange}
                        onFocus={() => { if (!disabled) setDoctorResultHidden(false) }}
                        onBlur={() => setTimeout(() => setDoctorResultHidden(true), 200)}
                        disabled={disabled}
                        style={{
                            cursor: disabled ? 'not-allowed' : 'pointer',
                            opacity: disabled ? 0.6 : 1,
                            backgroundColor: disabled ? '#f5f5f5' : 'white'
                        }}
                    />

                    <div
                        className="search-doctor-input-results"
                        style={{ display: doctorResultHidden || disabled ? 'none' : 'block' }}
                    >
                        {specialities.map(speciality => (
                            <div
                                className="search-doctor-result-item"
                                key={speciality}
                                onMouseDown={() => handleDoctorSelect(speciality)}
                            >
                                {/* span 1 — icon circle */}
                                <span>
                                    <i className="fa fa-user-md" style={{ color: '#3685fb', fontSize: '16px' }}></i>
                                </span>
                                {/* span 2 — speciality name */}
                                <span>{speciality}</span>
                                {/* span 3 — label */}
                                <span>SPECIALITY</span>
                            </div>
                        ))}
                    </div>
                </div>

                {disabled && (
                    <p style={{ color: 'red', fontSize: '13px', marginTop: '8px', textAlign: 'center' }}>
                        Search is currently disabled.
                    </p>
                )}
            </div>
        </div>
    );
};

export default FindDoctorSearch;