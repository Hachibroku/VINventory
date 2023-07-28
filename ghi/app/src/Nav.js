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
      { path: '/salespeople', name: 'Salespeople' },
      { path: '/salespeople/new', name: 'Add a Salesperson' }
    ] },
    { name: 'customers', routes: [
      { path: '/customers', name: 'Customers' },
      { path: '/customers/new', name: 'Add a Customer' }
    ] },
    { name: 'sales', routes: [
      { path: '/sales', name: 'List of All Sales' },
      { path: '/sales/new', name: 'New Sale' },
      { path: '/sales/history', name: 'Salesperson Sales History' }
    ] },
    { name: 'technicians', routes: [
      { path: '/technicians', name: 'List of Technicians'},
      { path: '/technicians/news', name: 'New Technician'}
    ] },
    { name: 'appointments', routes: [
      { path: '/appointments', name: 'List of Appointments'},
      { path: '/appointments/new', name: 'New Appointment'},
      { path: '/appointments/history', name: 'Appointment History'}
    ] },
    { name: 'manufacturers', routes: [
      { path: '/manufacturers', name: 'List of Manufacturers'},
      { path: '/manufacturers/new', name: 'New Manufacturer'},
    ] },
    { name: 'models', routes: [
      { path: '/models', name: 'List of Models'},
      { path: '/models/new', name: 'New Model'}
    ] },
    { name: 'automobiles', routes: [
      { path: '/automobiles', name: 'List of Automobiles'},
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
