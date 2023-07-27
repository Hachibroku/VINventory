import React, {useEffect, useState} from "react";

function SalespersonList() {
    const [salesperson, setSalesperson] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const getSalesperson = async () => {
        const salespersonUrl = 'http://localhost:8090/api/salespeople/';
        try {
            const response = await fetch(salespersonUrl);
            if (response.ok) {
                const listSalespeople = await response.json();
                setSalesperson(listSalespeople.salespeople);
                setIsLoading(false);
            } else {
                throw new Error('Failed to fetch salespeople');
            }
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getSalesperson();
    },[]);

    const deleteSalesperson = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this Salesperson?");
        if (!confirmed) {
            return;
        }

        try {
            const url = `http://localhost:8090/api/salespeople/${id}/`;
            const deleteResponse = await fetch(url, {
                method: "delete",
            });

            if (deleteResponse.ok) {
                getSalesperson();
            } else {
                throw new Error('Failed to delete salesperson');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!salesperson) {
        return <div>No salespeople found</div>;
    }

    return (
        <>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Employee Id</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {salesperson.map((salespeople) => {
                    return (
                        <tr key={salespeople.id}>
                            <td>{salespeople.first_name}</td>
                            <td>{salespeople.last_name}</td>
                            <td>{salespeople.employee_id}</td>
                            <td><button onClick={() => deleteSalesperson(salespeople.id)}>Delete</button></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </>
    )
}

export default SalespersonList;
