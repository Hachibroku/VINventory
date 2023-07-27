import React, {useEffect, useState} from "react";

function SalesList() {
    const [sale, setSale] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const getSale = async () => {
        const saleUrl = 'http://localhost:8090/api/sales/';
        try {
            const response = await fetch(saleUrl);
            if (response.ok) {
                const listSales = await response.json();
                setSale(listSales.sales);
                setIsLoading(false);
            } else {
                throw new Error('Failed to fetch sales');
            }
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getSale();
    },[]);

    const deleteSale = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this Sale?");
        if (!confirmed) {
            return;
        }

        try {
            const url = `http://localhost:8090/api/sales/${id}/`;
            const deleteResponse = await fetch(url, {
                method: "delete",
            });

            if (deleteResponse.ok) {
                getSale();
            } else {
                throw new Error('Failed to delete sale');
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

    if (!sale) {
        return <div>No sales found</div>;
    }

    return (
        <>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Automobile</th>
                    <th>Salesperson</th>
                    <th>Customer</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {sale.map((sales) => {
                    return (
                        <tr key={sales.id}>
                            <td>{sales.automobile.vin}</td>
                            <td>{sales.salesperson.first_name} {sales.salesperson.last_name}</td>
                            <td>{sales.customer.first_name} {sales.customer.last_name}</td>
                            <td>${sales.price}</td>
                            <td><button onClick={() => deleteSale(sales.id)}>Delete</button></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </>
    )
}

export default SalesList;
