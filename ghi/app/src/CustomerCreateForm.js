import React, { useState } from 'react';

function CustomerCreateForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleFirstNameChange = ({ target: { value } }) => {
        setFirstName(value);
    };

    const handleLastNameChange = ({ target: { value } }) => {
        setLastName(value);
    };

    const handleAddressChange = ({ target: { value } }) => {
        setAddress(value);
    };

    const handlePhoneNumberChange = ({ target: { value } }) => {
        setPhoneNumber(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newCustomer = {
            first_name: firstName,
            last_name: lastName,
            address: address,
            phone_number: phoneNumber
        };

        const customerUrl = 'http://localhost:8090/api/customers/';
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(newCustomer),
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const response = await fetch(customerUrl, fetchConfig);
        if (response.ok) {
            const createdCustomer = await response.json();
            alert(`Customer ${createdCustomer.first_name} ${createdCustomer.last_name} was created successfully`);
            setFirstName('');
            setLastName('');
            setAddress('');
            setPhoneNumber('');
        } else {
            alert('There was an error');
        }
    }


    return (
        <div className="shadow p-4 mt-4">
            <h1>Create a new customer</h1>
            <form onSubmit={handleSubmit} id="create-customer-form">
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
                        onChange={handleAddressChange}
                        value={address}
                        placeholder="Address"
                        required type="text"
                        name="address"
                        id="address"
                        className="form-control"
                    />
                    <label htmlFor="address">Address</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        onChange={handlePhoneNumberChange}
                        value={phoneNumber}
                        placeholder="Phone Number"
                        required type="text"
                        name="phone_number"
                        id="phone_number"
                        className="form-control"
                    />
                    <label htmlFor="phone_number">Phone Number</label>
                </div>
                <button className="btn btn-primary">Create</button>
            </form>
        </div>
    );
}

export default CustomerCreateForm;
