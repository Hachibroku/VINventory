import React, {useState} from 'react';

export default function ManufacturerCreate() {
    const [name, setName] = useState('')

    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {}
        data.name = name;

        const manufacturerUrl = 'http://localhost:8100/api/manufacturers/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        try {
            const response = await fetch(manufacturerUrl, fetchConfig);
            if (response.ok) {
                const newManufacturer = await response.json();
                setName('');
            } else {
                throw new Error('Error creating manufacturer');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    return (
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Add a new manufacturer</h1>
              <form onSubmit={handleSubmit} id="add-manufacturer-form">
                <div className="form-floating mb-3">
                  <input value={name} onChange={handleNameChange} placeholder="name" required type="text" name="name" id="name" className="form-control" />
                  <label htmlFor="name">Name</label>
                </div>
                <button className="btn btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
    );
}
