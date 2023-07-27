import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalespersonList from './SalespersonList';
import CustomerList from './CustomerList';
import SalesList from './SalesList';
import SalespersonCreateForm from './SalespersonCreateForm';
import SalesCreateForm from './SalesCreateForm';
import CustomerCreateForm from './CustomerCreateForm';
import SalesHistory from './SalesHistory';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/salespeople" element={<SalespersonList />} />
          <Route path="/salespeople/new" element={<SalespersonCreateForm />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/customers/new" element={<CustomerCreateForm />} />
          <Route path="/sales" element={<SalesList />} />
          <Route path="/sales/new" element={<SalesCreateForm />} />
          <Route path="/sales/history" element={<SalesHistory />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
