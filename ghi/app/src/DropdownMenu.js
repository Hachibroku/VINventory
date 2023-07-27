import { NavLink } from 'react-router-dom';

function DropdownMenu({ name, routes, isOpen, handleToggle }) {
  return (
    <div className="dropdown">
      <button onClick={handleToggle}>
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          {routes.map(route => (
            <NavLink key={route.path} className="dropdown-item" to={route.path}>
              {route.name}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
