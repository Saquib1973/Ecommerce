import React from "react";
import Layout from "../Components/Layout";
import { useNavigate } from "react-router-dom";

const Pagenotfound = () => {
  const navigate = useNavigate();
  return (
    <Layout>
      <div className="h-screen flex flex-col items-center justify-center">
        <p className="text-7xl overflow-hidden text-red-500">404</p>
        <p className="text-3xl text-gray-400">Page not found...</p>
        <button
          className="bg-green-400 text-white p-4 px-6 text-xl hover:bg-green-600  transition-all rounded-lg"
          onClick={() => {
            navigate("/");
          }}
        >
          Go Back
        </button>
      </div>
    </Layout>
  );
};

export default Pagenotfound;
