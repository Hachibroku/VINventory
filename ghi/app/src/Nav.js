import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="salespeopleDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Salespeople
              </a>
              <ul className="dropdown-menu" aria-labelledby="salespeopleDropdown">
                <li><NavLink className="dropdown-item" to="/salespeople">View All</NavLink></li>
                <li><NavLink className="dropdown-item" to="/salespeople/new">Add a Salesperson</NavLink></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="customersDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Customers
              </a>
              <ul className="dropdown-menu" aria-labelledby="customersDropdown">
                <li><NavLink className="dropdown-item" to="/customers">View All</NavLink></li>
                <li><NavLink className="dropdown-item" to="/customers/new">Add a Customer</NavLink></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="salesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Sales
              </a>
              <ul className="dropdown-menu" aria-labelledby="salesDropdown">
                <li><NavLink className="dropdown-item" to="/sales">List of All Sales</NavLink></li>
                <li><NavLink className="dropdown-item" to="/sales/new">New Sale</NavLink></li>
                <li><NavLink className="dropdown-item" to="/sales/history">Salesperon Sales History</NavLink></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="techniciansDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Technicians
              </a>
              <ul className="dropdown-menu" aria-labelledby="techniciansDropdown">
                <li><NavLink className="dropdown-item" to="/technicians">View All</NavLink></li>
                <li><NavLink className="dropdown-item" to="/technicians/new">Add a technician</NavLink></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="appointmentsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Appointments
              </a>
              <ul className="dropdown-menu" aria-labelledby="appointmentsDropdown">
                <li><NavLink className="dropdown-item" to="/appointments">View All</NavLink></li>
                <li><NavLink className="dropdown-item" to="/appointments/new">Create an appointment</NavLink></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="manufacturersDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Manufacturers
              </a>
              <ul className="dropdown-menu" aria-labelledby="manufacturersDropdown">
                <li><NavLink className="dropdown-item" to="/manufacturers">View All</NavLink></li>
                <li><NavLink className="dropdown-item" to="/manufacturers/new">Add a manufacturer</NavLink></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="modelsDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Models
              </a>
              <ul className="dropdown-menu" aria-labelledby="modelsDropdown">
                <li><NavLink className="dropdown-item" to="/models">View All</NavLink></li>
                <li><NavLink className="dropdown-item" to="/models/new">Create a model</NavLink></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="automobilesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Automobiles
              </a>
              <ul className="dropdown-menu" aria-labelledby="automobilesDropdown">
                <li><NavLink className="dropdown-item" to="/automobiles">Vehicles in stock</NavLink></li>
                <li><NavLink className="dropdown-item" to="/automobiles/new">Add a vehicle</NavLink></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
