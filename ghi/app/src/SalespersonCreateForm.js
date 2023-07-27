import React, {useState} from 'react';

function SalespersonCreateForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [employeeId, setEmployeeId] = useState('');

    const handleFirstNameChange = ({target: {value}}) => {
        setFirstName(value);
    };

    const handleLastNameChange = ({target: {value}}) => {
        setLastName(value);
    };

    const handleEmployeeIdChange = ({target: {value}}) => {
        setEmployeeId(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newSalesperson = {
            first_name: firstName,
            last_name: lastName,
            employee_id: employeeId,
        };

        const salespersonUrl = 'http://localhost:8090/api/salespeople/';
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(newSalesperson),
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const response = await fetch(salespersonUrl, fetchConfig);
        if (response.ok) {
            const createdSalesperson = await response.json();
            alert(`Salesperson was created with ID: ${createdSalesperson.employee_id}`);
            setFirstName('');
            setLastName('');
            setEmployeeId('');
        } else {
            alert('There was an error');
        }
    }


    return (
        <div className="shadow p-4 mt-4">
            <h1>Create a new salesperson</h1>
            <form onSubmit={handleSubmit} id="create-salesperson-form">
                <div className="form-floating mb-3">
                    <input
                    onChange={handleFirstNameChange}
                    value={firstName} placeholder="First Name"
                    required type="text"
                    name="first_name"
                    id="first_name"
                    className="form-control"
                    />
                    <label htmlFor="first_name">First Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                    onChange={handleLastNameChange}
                    value={lastName}
                    placeholder="Last Name"
                    required type="text"
                    name="last_name"
                    id="last_name"
                    className="form-control"
                    />
                    <label htmlFor="last_name">Last Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                    onChange={handleEmployeeIdChange}
                    value={employeeId}
                    placeholder="Employee ID"
                    required type="number"
                    name="employee_id"
                    id="employee_id"
                    className="form-control"
                    />
                    <label htmlFor="employee_id">Employee ID</label>
                </div>
                <button className="btn btn-primary">Create</button>
            </form>
        </div>
    );
}

export default SalespersonCreateForm;
