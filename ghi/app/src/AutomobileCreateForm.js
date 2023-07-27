import React, {useState, useEffect} from 'react';

export default function AutomobileCreate() {
    const [color, setColor] = useState('')
    const [year, setYear] = useState('')
    const [vin, setVin] = useState('')
    const [model, setModel] = useState('')
    const [models, setModels] = useState([])

    const handleColorChange = (event) => {
        setColor(event.target.value)
    }
    const handleYearChange = (event) => {
        setYear(event.target.value)
    }
    const handleVinChange = (event) => {
        setVin(event.target.value)
    }
    const handleModelChange = (event) => {
        setModel(event.target.value)
    }

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/models/'

        const response = await fetch(url)

        if (response.ok) {
            const data = await response.json()
            setModels(data.models)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {}
        data.color = color;
        data.year = year;
        data.vin = vin;
        data.model = model;

        const automobileUrl = 'http://localhost:8100/api/automobiles/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        try {
            const response = await fetch(automobileUrl, fetchConfig);
            if (response.ok) {
                const newAutomobile = await response.json();
                setColor('');
                setYear('');
                setVin('');
                setModel('');
            } else {
                throw new Error('Error creating automobile');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    return (
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Add a new automobile</h1>
              <form onSubmit={handleSubmit} id="add-automobile-form">
                <div className="form-floating mb-3">
                  <input value={color} onChange={handleColorChange} placeholder="color" required type="text" name="color" id="color" className="form-control" />
                  <label htmlFor="color">Color</label>
                </div>
                <div className="form-floating mb-3">
                  <input value={year} onChange={handleYearChange} placeholder="Year" required type="number" name="year" id="year" className="form-control" />
                  <label htmlFor="year">Year</label>
                </div>
                <div className="form-floating mb-3">
                  <input value={vin} onChange={handleVinChange} placeholder="Vin" required type="text" name="vin" id="vin" className="form-control" />
                  <label htmlFor="vin">Vin</label>
                </div>
                <div className="mb-3">
                  <select value={model} onChange={handleModelChange} required name="model" id="model" className="form-select">
                    <option value="">Choose model</option>
                    {models.map(model => {
                      return (
                        <option key={model.href} value={model.href}>
                          {`${model.name} `}
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
