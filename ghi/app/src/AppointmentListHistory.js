import React, { useEffect, useState } from "react";

export default function AppointmentListHistory() {
  const [appointments, setAppointments] = useState(null);
  const [automobiles, setAutomobiles] = useState([]);
  const [search, setSearch] = useState('');


  const getAppointments = async () => {
    const appointmentsUrl = `http://localhost:8080/api/appointments/`;
    const response = await fetch(appointmentsUrl);
    if (response.ok) {
      const listAppointments = await response.json();
      setAppointments(listAppointments.appointment);
    }
  };

  const getAutomobiles = async () => {
    const automobilesUrl = `http://localhost:8100/api/automobiles/`;
    const response = await fetch(automobilesUrl);
    if (response.ok) {
      const listAutomobiles = await response.json();
      setAutomobiles(listAutomobiles.autos);
    }
  };

  useEffect(() => {
    getAppointments();
    getAutomobiles();
  }, []);

  const handleSearch = event => {
    setSearch(event.target.value);
  };

  const filteredAppointments = appointments?.filter(appointment => {
    return appointment.vin.toLowerCase().includes(search.toLowerCase());
  })

  if (appointments === null) {
    return null;
  }

  return (
    <>
      <div className="form-group">
        <input type="text" className="form-control" placeholder="Search by VIN" value={search} onChange={handleSearch} />
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Date and Time</th>
            <th>VIP</th>
            <th>Reason</th>
            <th>VIN</th>
            <th>Customer</th>
            <th>Technician</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.map((appointment) => {
            const auto = automobiles.find(a => a.vin === appointment.vin);
            const isVip = auto && auto.sold;
            return (
              <tr key={appointment.id}>
                <td>{appointment.date_time}</td>
                <td>{isVip ? 'Yes' : 'No'}</td>
                <td>{appointment.reason}</td>
                <td>{appointment.vin}</td>
                <td>{appointment.customer}</td>
                <td>{appointment.technician.first_name}</td>
                <td>{appointment.status}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
