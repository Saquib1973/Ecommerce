import React from "react";
import Layout from "../../Components/Layout";
import AdminMenu from "../../Components/AdminMenu";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <Layout title={`Admin Dashboard`}>
      <div className="flex flex-col md:flex-row h-auto w-full items-center md:items-start justify-center md:justify-start gap-4">
        <AdminMenu />
        <Outlet />
      </div>
    </Layout>
  );
};

export default AdminDashboard;
