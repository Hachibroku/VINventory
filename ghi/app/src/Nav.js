import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Nav.css';
import DropdownMenu from './DropdownMenu';

function Nav() {
  const [dropdownState, setDropdownState] = useState({
    salespeople: false,
    customers: false,
    sales: false,
  });

  const location = useLocation();

  const handleDropdownToggle = (menu) => {
    setDropdownState(prevState => ({
      salespeople: false,
      customers: false,
      sales: false,
      [menu]: !prevState[menu]
    }));
  }

  useEffect(() => {
    setDropdownState({
      salespeople: false,
      customers: false,
      sales: false,
    });
  }, [location]);

  const menus = [
    { name: 'salespeople', routes: [
      { path: '/salespeople', name: 'List All Salespeople' },
      { path: '/salespeople/new', name: 'New Salesperson' }
    ] },
    { name: 'customers', routes: [
      { path: '/customers', name: 'List All Customers' },
      { path: '/customers/new', name: 'New Customer' }
    ] },
    { name: 'sales', routes: [
      { path: '/sales', name: 'List All Sales' },
      { path: '/sales/new', name: 'New Sale' },
      { path: '/sales/history', name: 'Salesperson Sales History' }
    ] },
    { name: 'technicians', routes: [
      { path: '/technicians', name: 'List All Technicians'},
      { path: '/technicians/new', name: 'New Technician'}
    ] },
    { name: 'appointments', routes: [
      { path: '/appointments', name: 'List All Appointments'},
      { path: '/appointments/new', name: 'New Appointment'},
      { path: '/appointments/history', name: 'Appointment History'}
    ] },
    { name: 'manufacturers', routes: [
      { path: '/manufacturers', name: 'List All Manufacturers'},
      { path: '/manufacturers/new', name: 'New Manufacturer'},
    ] },
    { name: 'models', routes: [
      { path: '/models', name: 'List All Models'},
      { path: '/models/new', name: 'New Model'}
    ] },
    { name: 'automobiles', routes: [
      { path: '/automobiles', name: 'List All Automobiles'},
      { path: '/automobiles/new', name: 'New Automobile'}
    ]}

  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item nav-dropdowns">
              {menus.map(menu => (
                <DropdownMenu
                  key={menu.name}
                  name={menu.name}
                  routes={menu.routes}
                  isOpen={dropdownState[menu.name]}
                  handleToggle={() => handleDropdownToggle(menu.name)}
                />
              ))}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
