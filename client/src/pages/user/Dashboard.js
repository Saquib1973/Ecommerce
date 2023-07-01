import React from "react";
import Layout from "../../Components/Layout";
import UserMenu from "./../../Components/UserMenu";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <Layout title={`Dashboard`}>
      <div className="flex md:flex-row flex-col gap-4">
        <UserMenu />
        <Outlet />
      </div>
    </Layout>
  );
};

export default Dashboard;
