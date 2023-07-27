import React, {useState, useEffect} from 'react';

export default function AppointmentCreate() {
    const [dateTime, setDateTime] = useState('')
    const [reason, setReason] = useState('')
    const [status, setStatus] = useState('')
    const [vin, setVin] = useState('')
    const [customer, setCustomer] = useState('')
    const [technician, setTechnician] = useState('')
    const [technicians, setTechnicians] = useState([])

    const handleDateTimeChange = (event) => {
        setDateTime(event.target.value)
    }

    const handleReasonChange = (event) => {
        setReason(event.target.value)
    }

    const handleStatusChange = (event) => {
        setStatus(event.target.value)
    }

    const handleVinChange = (event) => {
        setVin(event.target.value)
    }

    const handleCustomerChange = (event) => {
        setCustomer(event.target.value)
    }

    const handleTechnicianChange = (event) => {
        setTechnician(event.target.value)
    }

    const fetchData = async () => {
        const url = 'http://localhost:8100/api/technicians/'

        const response = await fetch(url)

        if (response.ok) {
            const data = await response.json()
            setTechnicians(data.technicians)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {}
        data.date_time = dateTime;
        data.reason = reason;
        data.status = status;
        data.vin = vin;
        data.customer = customer;
        data.technician = technician;

        const appointmentUrl = 'http://localhost:8100/api/appointments/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        try {
            const response = await fetch(appointmentUrl, fetchConfig);
            if (response.ok) {
                const newAppointment = await response.json();
                setDateTime('');
                setReason('');
                setStatus('');
                setVin('');
                setCustomer('');
                setTechnician('');
            } else {
                throw new Error('Error creating appointment');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    return (
        <div className="row">
          <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
              <h1>Add a new appointment</h1>
              <form onSubmit={handleSubmit} id="add-appointment-form">
                <div className="form-floating mb-3">
                  <input value={dateTime} onChange={handleDateTimeChange} placeholder="Date Time" required type="datetime-local" name="dateTime" id="dateTime" className="form-control" />
                  <label htmlFor="dateTime">Date Time</label>
                </div>
                <div className="form-floating mb-3">
                  <input value={reason} onChange={handleReasonChange} placeholder="Reason" required type="text" name="reason" id="reason" className="form-control" />
                  <label htmlFor="reason">Reason</label>
                </div>
                <div className="form-floating mb-3">
                  <input value={status} onChange={handleStatusChange} placeholder="Status" required type="text" name="status" id="status" className="form-control" />
                  <label htmlFor="status">Status</label>
                </div>
                <div className="form-floating mb-3">
                  <input value={vin} onChange={handleVinChange} placeholder="VIN" required type="text" name="vin" id="vin" className="form-control" />
                  <label htmlFor="vin">VIN</label>
                </div>
                <div className="form-floating mb-3">
                  <input value={customer} onChange={handleCustomerChange} placeholder="Customer" required type="text" name="customer" id="customer" className="form-control" />
                  <label htmlFor="customer">Customer</label>
                </div>
                <div className="mb-3">
                  <select value={technician} onChange={handleTechnicianChange} required name="technician" id="technician" className="form-select">
                    <option value="">Assign Technician</option>
                    {technicians.map(tech => {
                      return (
                        <option key={tech.id} value={tech.id}>
                          {`${tech.name} `}
                        </option>
                      )
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
