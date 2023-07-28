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
import TechniciansList from './TechniciansList';
import TechnicianCreate from './TechnicianCreateForm';
import AppointmentsList from './AppointmentsList';
import AppointmentHistory from './AppointmentListHistory';
import AppointmentCreate from './AppointmentCreateForm';
import ManufacturersList from './ManufacturersList';
import ManufacturerCreate from './ManufacturerCreateForm';
import ModelsList from './VehicleModelsList';
import ModelCreate from './VehicleModelCreateForm';
import AutomobilesList from './AutomobilesList';
import AutomobileCreate from './AutomobileCreateForm';

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
          <Route path="/technicians" element={<TechniciansList />} />
          <Route path="/technicians/new" element={<TechnicianCreate />} />
          <Route path="/appointments" element={<AppointmentsList />} />
          <Route path="/appointments/new" element={<AppointmentCreate />} />
          <Route path="/appointments/history" element={<AppointmentHistory />} />
          <Route path="/manufacturers" element={<ManufacturersList />} />
          <Route path="/manufacturers/new" element={<ManufacturerCreate />} />
          <Route path="/models" element={<ModelsList />} />
          <Route path="/models/new" element={<ModelCreate />} />
          <Route path="/automobiles" element={<AutomobilesList />} />
          <Route path="/automobiles/new" element={<AutomobileCreate />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
