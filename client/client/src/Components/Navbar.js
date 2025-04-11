
import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userName = localStorage.getItem("userName");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white p-4 m-2 flex justify-around items-center">
      <h1 className="text-xl ml-4 font-bold">Task Manager</h1>

      <div className="flex flex-wrap items-center space-x-4">
        {token ? (
          <>
            <span className="text-lg font-semibold ">Welcome, {userName} </span>
            <button onClick={handleLogout} className="bg-red-500 p-2 rounded hover:bg-red-700">Logout</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate("/register")} className="bg-green-500 px-3 py-1 rounded hover:bg-green-700">Register</button>
            <button onClick={() => navigate("/login")} className="bg-gray-500 px-3 py-1 rounded hover:bg-gray-700">Login</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
