import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import TechniciansList from './TechniciansList';
import TechnicianCreate from './TechnicianCreateForm';
import AppointmentsList from './AppointmentsList';
import AppointmentCreate from './AppointmentCreateForm';
import ManufacturersList from './ManufacturersList';
import ManufacturerCreate from './ManufacturerCreateForm';
import ModelsList from './VehicleModelsList';
import ModelCreate from './VehicleModelCreateForm';
import AutomobilesList from './AutomobilesList'
import AutomobileCreate from './AutomobileCreateForm'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/technicians" element={<TechniciansList />} />
          <Route path="/technicians/new" element={<TechnicianCreate />} />
          <Route path="/appointments" element={<AppointmentsList />} />
          <Route path="/appointments/new" element={<AppointmentCreate />} />
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
