import { NavLink } from "react-router-dom";

const Topbar = () => {
  return (
    <div className="rounded-lg flex justify-center bg-gray-900 text-white py-3 shadow-md items-center">
      <NavLink 
        to="/about/hardware" 
        className={({ isActive }) => isActive ? "px-4 py-2 text-green-400 border-b-2 border-green-400" : "px-4 py-2"}
      >
        Hardware
      </NavLink>
      <NavLink 
        to="/about/sourcecode" 
        className={({ isActive }) => isActive ? "px-4 py-2 text-green-400 border-b-2 border-green-400" : "px-4 py-2"}
      >
        Source Code
      </NavLink>
      <NavLink 
        to="/about/hosting" 
        className={({ isActive }) => isActive ? "px-4 py-2 text-green-400 border-b-2 border-green-400" : "px-4 py-2"}
      >
        Hosting
      </NavLink>
    </div>
  );
};

export default Topbar;
