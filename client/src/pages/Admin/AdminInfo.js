import React from "react";
import { useAuth } from "../../context/auth";

const AdminInfo = () => {
  const [auth] = useAuth();
  return (
    <div className="h-screen flex items-start justify-start my-3 w-[75vw]">
      <div className="bg-green-300 p-8 flex flex-col gap-4 text-white text-xl rounded-md shadow-md">
        <p>Admin Name : {auth.user.name}</p>
        <p>Admin Email : {auth.user.email}</p>
        <p>Admin Phone : {auth.user.phone}</p>
      </div>
    </div>
  );
};

export default AdminInfo;
