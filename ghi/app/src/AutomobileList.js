import React, {useEffect, useState} from "react";
import AutomobileCreate from "./AutomobileCreate";

export default function AutomobilesList() {
    const [automobiles, setAutomobiles] = useState(null);
    const getAutomobiles = async () => {
      const automobilesUrl = `http://localhost:8100/api/automobiles/`;
      const response = await fetch(automobilesUrl);
      if (response.ok) {
        const listAutomobiles = await response.json();
        setAutomobiles(listAutomobiles.automobiles);
      }
    };

    useEffect(() => {
      getAutomobiles();
    }, []);

    const deleteAutomobile = async (id) => {
      const confirmed = window.confirm("Are you sure you want to delete this automobile?");
      if (!confirmed) {
        return;
      }

      try {
        const url = `http://localhost:8100/api/automobiles/${id}/`;
        const deleteResponse = await fetch(url, {
          method: "delete",
        });

        if (deleteResponse.ok) {
          const reloadUrl = `http://localhost:8100/api/automobiles/`;
          const reloadResponse = await fetch(reloadUrl);
          const newAutomobiles = await reloadResponse.json();
          setAutomobiles(newAutomobiles.automobiles);
        }
      } catch (err) {
        console.log(err)
      }
    };


    if (automobiles === null) {
      return null;
    }

    return (
      <>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Color</th>
              <th>Year</th>
              <th>Vin</th>
              <th>Model</th>
            </tr>
          </thead>
          <tbody>
            {automobiles.map((automobile) => {
              return (
                <tr key={automobile.id}>
                  <td>{automobile.color}</td>
                  <td>{automobile.year}</td>
                  <td>{automobile.vin}</td>
                  <td>{automobile.model.name}</td>

                  <td>
                  <button onClick={() => deleteAutomobile(automobile.id)} className="btn btn-danger">
                    Delete
                  </button>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
        <AutomobileCreate />
      </>
    );
  }
