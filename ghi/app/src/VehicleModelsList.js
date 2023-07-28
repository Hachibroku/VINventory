import React, {useEffect, useState} from "react";


export default function ModelsList() {
    const [models, setModels] = useState(null);
    const getModels = async () => {
      const modelsUrl = `http://localhost:8100/api/models/`;
      const response = await fetch(modelsUrl);
      if (response.ok) {
        const listModels = await response.json();
        setModels(listModels.models);
      }
    };

    useEffect(() => {
      getModels();
    }, []);


    if (models === null) {
      return null;
    }

    return (
      <>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Model Name</th>
              <th>Picture URL</th>
              <th>Manufacturer</th>
            </tr>
          </thead>
          <tbody>
            {models.map((model) => {
              return (
                <tr key={model.id}>
                  <td>{model.name}</td>
                  <td>
                    <img
                      src={model.picture_url}
                      alt=""
                      width="100px"
                      height="100px"
                    />
                  </td>
                  <td>{model.manufacturer.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    );
}
