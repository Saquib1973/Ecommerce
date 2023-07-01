import React from "react";
import { useAuth } from "../../context/auth";
import Redirect from "../Redirect";

const AdminRoute = ({ children }) => {
  const [auth] = useAuth();
  if (auth.user === null) {
    return <Redirect />;
  } else if (auth?.user?.role === 0) {
    return <Redirect />;
  } else {
    return children;
  }
};

export default AdminRoute;
