import React, { useState, useEffect } from 'react';

function SaleCreateForm() {
    const [automobiles, setAutomobiles] = useState([]);
    const [salespersons, setSalespersons] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [selectedAutomobile, setSelectedAutomobile] = useState(null);
    const [selectedSalesperson, setSelectedSalesperson] = useState(null);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [price, setPrice] = useState('');
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        Promise.all([
            fetch('http://localhost:8100/api/automobiles/').then(response => response.json()),
            fetch('http://localhost:8090/api/salespeople/').then(response => response.json()),
            fetch('http://localhost:8090/api/customers/').then(response => response.json()),
        ]).then(([autoData, salespersonData, customerData]) => {
            setAutomobiles(autoData.autos);
            setSalespersons(salespersonData.salespeople);
            setCustomers(customerData.customers);
            setLoading(false);
        });
    }, []);


    const handlePriceChange = ({ target: { value } }) => {
        setPrice(value);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        const selectedAutoVin = automobiles.find(auto => auto.id === selectedAutomobile)?.vin;

        const newSale = {
            automobile: selectedAutoVin,
            salesperson: selectedSalesperson,
            customer: selectedCustomer,
            price: price,
        };

        const saleUrl = 'http://localhost:8090/api/sales/';
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(newSale),
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const response = await fetch(saleUrl, fetchConfig);
        if (response.ok) {
            const createdSale = await response.json();
            alert(`Sale was created successfully with ID: ${createdSale.id}`);
            setSelectedAutomobile(null);
            setSelectedSalesperson(null);
            setSelectedCustomer(null);
            setPrice('');
        } else {
            const errorData = await response.json();
            alert('There was an error: ' + JSON.stringify(errorData));
        }
    }



    if (loading){
        return <div>Loading...</div>
    }


    return (
        <div className="shadow p-4 mt-4">
            <h1>Create a new sale</h1>
            <form onSubmit={handleSubmit} id="create-sale-form">
                <div className="form-floating mb-3">
                    <select
                        onChange={({ target: { value } }) => setSelectedAutomobile(Number(value))}
                        value={selectedAutomobile || ''}
                        required
                        name="automobile"
                        id="automobile"
                        className="form-control"
                    >
                        <option value="">Select an Automobile</option>
                        {automobiles && automobiles.map(auto => (
                            <option key={auto.id} value={auto.id}>{auto.vin}</option>
                        ))}
                    </select>
                    <label htmlFor="automobile">Automobile</label>
                </div>
                <div className="form-floating mb-3">
                    <select
                        onChange={({ target: { value } }) => setSelectedSalesperson(value)}
                        value={selectedSalesperson || ''}
                        required
                        name="salesperson"
                        id="salesperson"
                        className="form-control"
                    >
                        <option value="">Select a Salesperson</option>
                        {salespersons && salespersons.map(sp => (
                            <option key={sp.id} value={sp.id}>{sp.first_name} {sp.last_name}</option>
                        ))}
                    </select>
                    <label htmlFor="salesperson">Salesperson</label>
                </div>
                <div className="form-floating mb-3">
                    <select
                        onChange={({ target: { value } }) => setSelectedCustomer(value)}
                        value={selectedCustomer || ''}
                        required
                        name="customer"
                        id="customer"
                        className="form-control"
                    >
                        <option value="">Select a Customer</option>
                        {customers && customers.map(cust => (
                            <option key={cust.id} value={cust.id}>{cust.first_name} {cust.last_name}</option>
                        ))}
                    </select>
                    <label htmlFor="customer">Customer</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        onChange={handlePriceChange}
                        value={price}
                        placeholder="Sale Price"
                        required type="number"
                        step="0.01" min="0"
                        name="price"
                        id="price"
                        className="form-control"
                    />
                    <label htmlFor="price">Sale Price</label>
                </div>
                <button className="btn btn-primary">Create</button>
            </form>
        </div>
    );

}

export default SaleCreateForm;
