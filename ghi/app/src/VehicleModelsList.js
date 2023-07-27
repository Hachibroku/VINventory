import React, {useEffect, useState} from "react";
import ModelCreate from "./ModelCreate";

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

    const deleteModel = async (id) => {
      const confirmed = window.confirm("Are you sure you want to delete this model?");
      if (!confirmed) {
        return;
      }

      try {
        const url = `http://localhost:8100/api/models/${id}/`;
        const deleteResponse = await fetch(url, {
          method: "delete",
        });

        if (deleteResponse.ok) {
          const reloadUrl = `http://localhost:8100/api/models/`;
          const reloadResponse = await fetch(reloadUrl);
          const newModels = await reloadResponse.json();
          setModels(newModels.models);
        }
      } catch (err) {
        console.log(err)
      }
    };


    if (models === null) {
      return null;
    }

    return (
      <>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Picture</th>
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
                        alt="Picture of a car"
                        width="100px"
                        height="100px"
                    />
                  </td>
                  <td>{model.manufacturer.name}</td>

                  <td>
                  <button onClick={() => deleteModel(model.id)} className="btn btn-danger">
                    Delete
                  </button>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
        <ModelCreate />
      </>
    );
  }
