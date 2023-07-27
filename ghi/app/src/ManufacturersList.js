import React, {useEffect, useState} from "react";
import ManufacturerCreate from "./ManufacturerCreate";

export default function ManufacturersList() {
    const [manufacturers, setManufacturers] = useState(null);
    const getManufacturers = async () => {
      const manufacturersUrl = `http://localhost:8100/api/manufacturers/`;
      const response = await fetch(manufacturersUrl);
      if (response.ok) {
        const listManufacturers = await response.json();
        setManufacturers(listManufacturers.manufacturers);
      }
    };

    useEffect(() => {
      getManufacturers();
    }, []);

    const deleteManufacturer = async (id) => {
      const confirmed = window.confirm("Are you sure you want to delete this manufacturer?");
      if (!confirmed) {
        return;
      }

      try {
        const url = `http://localhost:8100/api/manufacturers/${id}/`;
        const deleteResponse = await fetch(url, {
          method: "delete",
        });

        if (deleteResponse.ok) {
          const reloadUrl = `http://localhost:8100/api/manufacturers/`;
          const reloadResponse = await fetch(reloadUrl);
          const newManufacturers = await reloadResponse.json();
          setManufacturers(newManufacturers.manufacturers);
        }
      } catch (err) {
        console.log(err)
      }
    };


    if (manufacturers === null) {
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
            {manufacturers.map((manufacturer) => {
              return (
                <tr key={manufacturer.id}>
                  <td>{manufacturer.name}</td>
                  <td>
                  <button onClick={() => deleteManufacturer(manufacturer.id)} className="btn btn-danger">
                    Delete
                  </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <ManufacturerCreate />
      </>
    );
  }
