import React, { useEffect, useState } from "react";

export default function TechniciansList() {
  const [technicians, setTechnicians] = useState(null);

  const getTechnicians = async () => {
    const techniciansUrl = `http://localhost:8080/api/technicians/`;
    const response = await fetch(techniciansUrl);
    if (response.ok) {
      const listTechnicians = await response.json();
      setTechnicians(listTechnicians.technicians);
    }
  };

  useEffect(() => {
    getTechnicians();
  }, []);


  if (technicians === null) {
    return null;
  }

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Employee ID</th>
          </tr>
        </thead>
        <tbody>
          {technicians.map((technician) => {
            return (
              <tr key={technician.id}>
                <td>{technician.first_name}</td>
                <td>{technician.last_name}</td>
                <td>{technician.employee_id}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
