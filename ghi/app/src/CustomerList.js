import React, {useEffect, useState} from "react";

function CustomerList() {
    const [customer, setCustomer] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const getCustomer = async () => {
        const customerUrl = 'http://localhost:8090/api/customers/';
        try {
            const response = await fetch(customerUrl);
            if (response.ok) {
                const listCustomers = await response.json();
                setCustomer(listCustomers.customers);
                setIsLoading(false);
            } else {
                throw new Error('Failed to fetch customers');
            }
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getCustomer();
    },[]);

    const deleteCustomer = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this Customer?");
        if (!confirmed) {
            return;
        }

        try {
            const url = `http://localhost:8090/api/customers/${id}/`;
            const deleteResponse = await fetch(url, {
                method: "delete",
            });

            if (deleteResponse.ok) {
                getCustomer();
            } else {
                throw new Error('Failed to delete customer');
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

    if (!customer) {
        return <div>No customers found</div>;
    }

    return (
        <>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Address</th>
                    <th>Phone Number</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {customer.map((customers) => {
                    return (
                        <tr key={customers.id}>
                            <td>{customers.first_name}</td>
                            <td>{customers.last_name}</td>
                            <td>{customers.address}</td>
                            <td>{customers.phone_number}</td>
                            <td><button onClick={() => deleteCustomer(customers.id)}>Delete</button></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </>
    )
}

export default CustomerList;
