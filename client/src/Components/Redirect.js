import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/auth";
import Layout from "./Layout";

const Redirect = () => {
  const [auth] = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [count, setCount] = useState(5);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    count === 0 &&
      navigate(`/`, {
        state: location.pathname,
      });
    return () => clearInterval(interval);
  }, [count, navigate, location, auth]);

  return (
    <Layout title={"Invalid Auth"}>
      {" "}
      Invalid Auth <br />
      Redirecting in {count}
    </Layout>
  );
};

export default Redirect;
