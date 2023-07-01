import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  const activeLink =
    "text-xl transition-all px-2 border-b-4 rounded-bl-lg border-green-500 border-collapse border-l-4 duration-500 border-blue-300 py-2 text-green-600 text-gray-500 tracking-widest";
  const notActive =
    "text-xl transition-all px-2 border-b-4 rounded-bl-lg border-transparent border-collapse border-l-4 duration-500 hover:border-blue-300 py-2 text-green-600 hover:text-gray-500 hover:tracking-widest";

  return (
    <div className="w-full md:w-[20vw] lg:w-[15vw] shadow-md rounded-md m-2 h-1/2 bg-green-200">
      <div className="flex flex-col gap-4    py-10 px-8">
        <NavLink
          to="/dashboard-user"
          className={({ isActive }) => (isActive ? activeLink : notActive)}
        >
          User Profile
        </NavLink>
        <NavLink
          to="/dashboard-user/orders"
          className={({ isActive }) => (isActive ? activeLink : notActive)}
        >
          Orders
        </NavLink>
      </div>
    </div>
  );
};

export default UserMenu;
