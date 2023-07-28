import React, {useEffect, useState} from "react";

export default function AutomobilesList() {
    const [automobiles, setAutomobiles] = useState(null);
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
      getAutomobiles();
    }, []);


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
              <th>Sold?</th>
            </tr>
          </thead>
          <tbody>
            {automobiles.map((autos) => {
              return (
                <tr key={autos.id}>
                  <td>{autos.color}</td>
                  <td>{autos.year}</td>
                  <td>{autos.vin}</td>
                  <td>{autos.model.name}</td>
                  <td> {autos.sold ? 'Yes': 'No'} </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
  }
