import React from 'react';
import './ReportsLayout.css';

const ReportsLayout = () => {
    // Mock data - replace with API data later
    const reportsData = [
        { id: 1, doctor: "Dr. Smith", specialty: "Cardiology", report: "Report_1.pdf" },
        { id: 2, doctor: "Dr. Doe", specialty: "Dermatology", report: "Report_2.pdf" },
    ];

    return (
        <div className="reports-container">
            <h2>Your Reports</h2>
            <table className="reports-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Doctor Name</th>
                        <th>Doctor Specialty</th>
                        <th>Link to Report</th>
                    </tr>
                </thead>
                <tbody>
                    {reportsData.map((report) => (
                        <tr key={report.id}>
                            <td>{report.id}</td>
                            <td>{report.doctor}</td>
                            <td>{report.specialty}</td>
                            <td><a href={report.report} download>Download</a></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReportsLayout;