import React, { useState } from 'react';
import './FindDoctorSearchIC.css';
import { useNavigate } from 'react-router-dom';

const initSpeciality = [
    'Dentist', 'Gynecologist/obstetrician', 'General Physician', 'Dermatologist', 'Ear-nose-throat (ent) Specialist', 'Homeopath', 'Ayurveda'
];

const FindDoctorSearch = () => {
    const [doctorResultHidden, setDoctorResultHidden] = useState(true);
    const [searchDoctor, setSearchDoctor] = useState('');
    const [specialities, setSpecialities] = useState(initSpeciality);
    const navigate = useNavigate();

    const handleDoctorSelect = (speciality) => {
        setSearchDoctor(speciality);
        setDoctorResultHidden(true);
        navigate(`/instant-consultation?speciality=${speciality}`);
        window.location.reload();
    };

    // Filter specialities dynamically as the user types
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchDoctor(query);

        const filtered = initSpeciality.filter(speciality =>
            speciality.toLowerCase().includes(query.toLowerCase())
        );
        setSpecialities(filtered);
    };

    return (
        <div className='finddoctor'>
            <center>
                <h1>Find a doctor and Consult instantly</h1>
                <div>
                    <i style={{ color: '#3685fb', fontSize: '20rem' }} className="fa fa-user-md"></i>
                </div>
                <div className="home-search-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div className="doctor-search-box">
                        <input
                            type="text"
                            className="search-doctor-input-box"
                            placeholder="Search doctors, clinics, hospitals, etc."
                            value={searchDoctor}
                            onChange={handleSearchChange}
                            onFocus={() => setDoctorResultHidden(false)}
                            // Slight timeout keeps dropdown open long enough for click to register
                            onBlur={() => setTimeout(() => setDoctorResultHidden(true), 200)}
                        />

                        <div className="search-doctor-input-results" hidden={doctorResultHidden}>
                            {
                                specialities.map(speciality => (
                                    <div
                                        className="search-doctor-result-item"
                                        key={speciality}
                                        // Using onMouseDown executes BEFORE the onBlur hides the box
                                        onMouseDown={() => handleDoctorSelect(speciality)}
                                    >
                                        <span>{speciality}</span>
                                        <span>SPECIALITY</span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </center>
        </div>
    );
};

export default FindDoctorSearch;