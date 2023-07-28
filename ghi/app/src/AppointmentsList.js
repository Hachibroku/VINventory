import React, { useEffect, useState } from "react";

export default function AppointmentsList() {
  const [appointments, setAppointments] = useState(null);
  const [automobiles, setAutomobiles] = useState([]);

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
      console.log(listAutomobiles)
      setAutomobiles(listAutomobiles.autos);
    }
  };

  useEffect(() => {
    getAppointments();
    getAutomobiles();
  }, []);

  const updateAppointmentStatus = async (id, status) => {
    const updateUrl = `http://localhost:8080/api/appointments/${id}/${status}/`;
    const response = await fetch(updateUrl, { method: 'PUT' });

    if (response.ok) {
      getAppointments();
    }
  }

  if (appointments === null) {
    return null;
  }

  const filteredAppointments = appointments.filter(appointment =>
    appointment.status !== 'Cancelled' && appointment.status !== 'Finished');

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Date and Time</th>
            <th>Reason</th>
            <th>VIN</th>
            <th>Customer</th>
            <th>Technician</th>
            <th>VIP</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.map((appointment, autos) => {
            return (
              <tr key={appointment.id}>
                <td>{appointment.date_time}</td>
                <td>{appointment.reason}</td>
                <td>{appointment.vin}</td>
                <td>{appointment.customer}</td>
                <td>{appointment.technician.first_name}</td>
                <td> {autos.sold ? 'Yes': 'No'} </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => updateAppointmentStatus(appointment.id, 'cancel')}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => updateAppointmentStatus(appointment.id, 'finish')}
                  >
                    Finish
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
