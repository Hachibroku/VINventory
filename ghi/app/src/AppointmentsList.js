import React, { useEffect, useState } from "react";

export default function AppointmentsList() {
  const [appointments, setAppointments] = useState(null);
  const getAppointments = async () => {
    const appointmentsUrl = `http://localhost:8080/api/appointments/`;
    const response = await fetch(appointmentsUrl);
    if (response.ok) {
      const listAppointments = await response.json();
      console.log(listAppointments)
      setAppointments(listAppointments.appointment);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);


  if (appointments === null) {
    return null;
  }

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
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => {
            return (
              <tr key={appointment.id}>
                <td>{appointment.date_time}</td>
                <td>{appointment.reason}</td>
                <td>{appointment.vin}</td>
                <td>{appointment.customer}</td>
                <td>{appointment.technician.first_name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
