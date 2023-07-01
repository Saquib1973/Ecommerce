import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  const activeLink =
    "text-xl transition-all px-2 border-b-4 rounded-bl-lg border-green-400 border-collapse border-l-4 duration-500 border-blue-300 py-2 text-green-600 text-gray-500 tracking-widest";
  const notActive =
    "text-xl transition-all px-2 border-b-4 rounded-bl-lg border-transparent border-collapse border-l-4 duration-500 hover:border-blue-300 py-2 text-green-600 hover:text-gray-500 hover:tracking-widest";
  return (
    <div className="shadow-md rounded-md m-2 h-1/2 w-full md:w-[20vw] lg:w-[15vw]  bg-green-200">
      <div className="flex flex-col gap-4  py-10  px-8">
        <NavLink
          to="/dashboard-admin/create-category"
          className={({ isActive }) => (isActive ? activeLink : notActive)}
        >
          Create category
          {/* <div className="h-2 w-full bg-white rounded-full" /> */}
        </NavLink>
        <NavLink
          to="/dashboard-admin/create-product"
          className={({ isActive }) => (isActive ? activeLink : notActive)}
        >
          Create Product
          {/* <div className="h-2 w-full bg-white rounded-full" /> */}
        </NavLink>
        <NavLink
          to="/dashboard-admin/products"
          className={({ isActive }) => (isActive ? activeLink : notActive)}
        >
          Products
          {/* <div className="h-2 w-full bg-white rounded-full" /> */}
        </NavLink>
        <NavLink
          to="/dashboard-admin/orders"
          className={({ isActive }) => (isActive ? activeLink : notActive)}
        >
          Orders
          {/* <div className="h-2 w-full bg-white rounded-full" /> */}
        </NavLink>
        <NavLink
          to="/dashboard-admin/users"
          className={({ isActive }) => (isActive ? activeLink : notActive)}
        >
          Users
          {/* <div className="h-2 w-full bg-white rounded-full" /> */}
        </NavLink>
      </div>
    </div>
  );
};

export default AdminMenu;
