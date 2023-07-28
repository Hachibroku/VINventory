import React, {useEffect, useState} from "react";

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
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
