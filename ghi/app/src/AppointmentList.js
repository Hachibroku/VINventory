import React, {useEffect, useState} from "react";
import AppointmentCreate from "./AppointmentCreate";

export default function AppointmentsList() {
    const [appointments, setAppointments] = useState(null);

    const getAppointments = async () => {
      const appointmentsUrl = `http://localhost:8100/api/appointments/`;
      const response = await fetch(appointmentsUrl);

      if (response.ok) {
        const listAppointments = await response.json();
        setAppointments(listAppointments.appointments);
      }
    };

    useEffect(() => {
      getAppointments();
    }, []);

    const deleteAppointment = async (id) => {
      const confirmed = window.confirm("Are you sure you want to delete this appointment?");
      if (!confirmed) {
        return;
      }

      try {
        const url = `http://localhost:8100/api/appointments/${id}/`;
        const deleteResponse = await fetch(url, {
          method: "delete",
        });

        if (deleteResponse.ok) {
          const reloadUrl = `http://localhost:8100/api/appointments/`;
          const reloadResponse = await fetch(reloadUrl);
          const newAppointments = await reloadResponse.json();
          setAppointments(newAppointments.appointments);
        }
      } catch (err) {
        console.log(err)
      }
    };

    if (appointments === null) {
      return null;
    }

    return (
      <>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Date Time</th>
              <th>Reason</th>
              <th>Status</th>
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
                  <td>{appointment.status}</td>
                  <td>{appointment.vin}</td>
                  <td>{appointment.customer}</td>
                  <td>{appointment.technician.name}</td>
                  <td>
                  <button onClick={() => deleteAppointment(appointment.id)} className="btn btn-danger">
                    Delete
                  </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <AppointmentCreate />
      </>
    );
  }
