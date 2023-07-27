import React, {useEffect, useState} from "react";
import TechnicianCreate from "./TechnicianCreate";

export default function TechniciansList() {
    const [technicians, setTechnicians] = useState(null);

    const getTechnicians = async () => {
      const techniciansUrl = `http://localhost:8100/api/technicians/`;
      const response = await fetch(techniciansUrl);
      if (response.ok) {
        const listTechnicians = await response.json();
        setTechnicians(listTechnicians.technicians);
      }
    };

    useEffect(() => {
      getTechnicians();
    }, []);

    const deleteTechnician = async (id) => {
      const confirmed = window.confirm("Are you sure you want to delete this technician?");
      if (!confirmed) {
        return;
      }

      try {
        const url = `http://localhost:8100/api/technicians/${id}/`;
        const deleteResponse = await fetch(url, {
          method: "delete",
        });

        if (deleteResponse.ok) {
          const reloadUrl = `http://localhost:8100/api/technicians/`;
          const reloadResponse = await fetch(reloadUrl);
          const newTechnicians = await reloadResponse.json();
          setTechnicians(newTechnicians.technicians);
        }
      } catch (err) {
        console.log(err)
      }
    };


    if (technicians === null) {
      return null;
    }

    return (
      <>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {technicians.map((technician) => {
              return (
                <tr key={technician.id}>
                  <td>{technician.name}</td>
                  <td>
                  <button onClick={() => deleteTechnician(technician.id)} className="btn btn-danger">
                    Delete
                  </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <TechnicianCreate />
      </>
    );
  }
