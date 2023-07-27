import React, {useState, useEffect} from 'react';

export default function ModelCreate() {
    const [name, setName] = useState('')
    const [pictureUrl, setPictureUrl] = useState('')
    const [manufacturer, setManufacturer] = useState('')
    const [manufacturers, setManufacturers] = useState([])

    const handleNameChange = (event) => {
        setName(event.target.value)
    }
    const handlePictureUrlChange = (event) => {
        setPictureUrl(event.target.value)
    }
    const handleManufacturerChange = (event) => {
        setManufacturer(event.target.value)
    }

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/manufacturers/'

        const response = await fetch(url)

        if (response.ok) {
            const data = await response.json()
            setManufacturers(data.manufacturers)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {}
        data.name = name;
        data.picture_url = pictureUrl;
        data.manufacturer_id = manufacturer;

        const modelUrl = 'http://localhost:8100/api/models/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        try {
            const response = await fetch(modelUrl, fetchConfig);
            if (response.ok) {
                const newModel = await response.json();
                setName('');
                setPictureUrl('');
                setManufacturer('');
            } else {
                throw new Error('Error creating model');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    return (
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Add a new model</h1>
              <form onSubmit={handleSubmit} id="add-model-form">
                <div className="form-floating mb-3">
                  <input value={name} onChange={handleNameChange} placeholder="name" required type="text" name="name" id="name" className="form-control" />
                  <label htmlFor="name">Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input value={pictureUrl} onChange={handlePictureUrlChange} placeholder="Picture URL" required type="url" name="pictureUrl" id="pictureUrl" className="form-control" />
                  <label htmlFor="pictureUrl">Picture URL</label>
                </div>
                <div className="mb-3">
                  <select value={manufacturer} onChange={handleManufacturerChange} required name="manufacturer" id="manufacturer" className="form-select">
                    <option value="">Choose manufacturer</option>
                    {manufacturers.map(manufacturer => {
                      return (
                        <option key={manufacturer.id} value={manufacturer.id}>
                          {`${manufacturer.name} `}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <button className="btn btn-primary">Create</button>
              </form>
            </div>
          </div>
        </div>
    );
}
