import React from 'react';
import './ReportsLayout.css';

const ReportsLayout = () => {
    // We assume patient_report.pdf is in the public folder
    const reportsData = [
        { id: 1, doctor: "Dr. Smith", specialty: "Cardiology", report: "/patient_report.pdf" },
        { id: 2, doctor: "Dr. Doe", specialty: "Dermatology", report: "/patient_report.pdf" },
    ];

    return (
        <div className="reports-container">
            <h2>Your Medical Reports</h2>
            <table className="reports-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Doctor Name</th>
                        <th>Specialty</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reportsData.map((report) => (
                        <tr key={report.id}>
                            <td>{report.id}</td>
                            <td>{report.doctor}</td>
                            <td>{report.specialty}</td>
                            <td>
                                {/* View Report in New Tab */}
                                <a href={report.report} target="_blank" rel="noopener noreferrer" className="btn-view">
                                    View
                                </a>
                                {/* Download Report */}
                                <a href={report.report} download="Patient_Report.pdf" className="btn-download">
                                    Download
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReportsLayout;