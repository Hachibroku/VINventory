import React, { useState, useEffect } from 'react';

function SalesHistory() {
  const [salespersons, setSalespersons] = useState([]);
  const [selectedSalesperson, setSelectedSalesperson] = useState(null);
  const [sales, setSales] = useState([]);

  // Fetch the salespersons when the component mounts
  useEffect(() => {
    fetch('http://localhost:8090/api/salespeople/')
      .then(response => response.json())
      .then(data => setSalespersons(data.salespeople));
  }, []);

  // Fetch the sales for the selected salesperson whenever it changes
  const handleSalespersonChange = ({ target: { value } }) => {
    setSelectedSalesperson(value);
  };

  useEffect(() => {
    if (selectedSalesperson) {

        fetch(`http://localhost:8090/api/sales?salesperson=${selectedSalesperson}`)
        .then(response => response.json())
        .then(data => {
          setSales(data.sales);
        });
    }
  }, [selectedSalesperson]);

  return (
    <div>
      <h1>Sales History</h1>
      <select onChange={handleSalespersonChange} value={selectedSalesperson || ''}>
        <option value="">Select a Salesperson</option>
        {salespersons.map(sp => (
          <option key={sp.id} value={sp.id}>{sp.first_name} {sp.last_name}</option>
        ))}
      </select>
      {sales.map(sale => (

        <div key={sale.id}>
          <p>Salesperson: {sale.salesperson.first_name} {sale.salesperson.last_name}</p>
          <p>Customer: {sale.customer.first_name} {sale.customer.last_name}</p>
          <p>Automobile: {sale.automobile.vin}</p>
          <p>Price: {sale.price}</p>
        </div>
      ))}
    </div>
  );
}

export default SalesHistory;
