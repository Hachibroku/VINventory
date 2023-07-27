import React, { useState } from 'react';

export default function TechnicianCreate() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [employeeId, setEmployeeId] = useState('');

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const handleEmployeeIdChange = (event) => {
        setEmployeeId(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {}
        data.first_name = firstName
        data.last_name = lastName
        data.employee_id = employeeId

        const technicianUrl = 'http://localhost:8080/api/technicians/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        try {
            const response = await fetch(technicianUrl, fetchConfig);
            if (response.ok) {
                const newTechnician = await response.json();
                setFirstName('');
                setLastName('');
                setEmployeeId('');
            } else {
                throw new Error('Error creating technician');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    return (
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Add a new technician</h1>
              <form onSubmit={handleSubmit} id="add-technician-form">
                <div className="form-floating mb-3">
                  <input value={firstName} onChange={handleFirstNameChange} placeholder="First Name" required type="text" name="firstName" id="firstName" className="form-control" />
                  <label htmlFor="firstName">First Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input value={lastName} onChange={handleLastNameChange} placeholder="Last Name" required type="text" name="lastName" id="lastName" className="form-control" />
                  <label htmlFor="lastName">Last Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input value={employeeId} onChange={handleEmployeeIdChange} placeholder="ID Number" required type="text" name="employeeId" id="employeeId" className="form-control" />
                  <label htmlFor="employeeId">ID Number</label>
                </div>
                <button className="btn btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
    );
}
