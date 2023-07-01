import React, { useState } from "react";
import Layout from "../../Components/Layout";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";

const Login = () => {
  const location = useLocation();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  //Function to save value of input whenever changed
  const handlechange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    try {
      const res = await axios.post(`http://localhost:8080/api/v1/auth/login`, {
        email: data.email,
        password: data.password,
      });
      if (res.data.success) {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            }  bg-green-200 border-2 border-green-300 p-2 rounded-xl `}
          >
            <div className="flex gap-2">
              <div className="text-green-500 p-2">{res.data.message}</div>
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                }}
                className="animate-pulse acti px-2 rounded-md bg-green-400 text-white"
              >
                Close
              </button>
            </div>
          </div>
        ));
        navigate(location.state || "/");
      } else {
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            }  bg-green-200 border-2 border-green-300 p-2 rounded-xl `}
          >
            <div className="flex gap-2">
              <div className="text-green-500 p-2">{res.data.message}</div>
              <button
                onClick={() => {
                  toast.dismiss(t.id);
                }}
                className="animate-pulse acti px-2 rounded-md bg-green-400 text-white"
              >
                Close
              </button>
            </div>
          </div>
        ));
      }
    } catch (error) {
      console.log(error);
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          }  bg-red-200 border-2 border-red-300 p-2 rounded-xl `}
        >
          <div className="flex gap-2">
            <div className="text-red-500 p-2">
              {error.response.data.message}
            </div>
            <button
              onClick={() => {
                toast.dismiss(t.id);
              }}
              className="animate-pulse acti px-2 rounded-md bg-red-400 text-white"
            >
              Close
            </button>
          </div>
        </div>
      ));
    }
  };
  //Items Array
  const items = [
    {
      type: "email",
      placeholder: "Enter your email",
      name: "email",
    },
    {
      type: "password",
      placeholder: "Enter your password",
      name: "password",
    },
  ];
  return (
    <Layout title={`Register`}>
      <div className="h-[80vh] flex flex-col gap-4 items-center justify-center">
        <div className="text-4xl text-green-500">Login</div>
        <form
          onSubmit={handleSubmit}
          className="bg-green-200 p-6 py-16 flex flex-col gap-4 items-center justify-center rounded-lg"
        >
          {items.map((items) => (
            <div
              className="text-sm sm:text-xl flex w-full items-center gap-2 justify-between"
              key={items.name}
            >
              <label htmlFor="" className="capitalize text-green-600">
                {items.name} :
              </label>
              <input
                autoComplete="given-name"
                name={items.name}
                type={items.type}
                placeholder={items.placeholder}
                className="border-2 m-2 px-3 py-1 rounded-sm outline-2 focus:outline-green-400"
                onChange={handlechange}
              />
            </div>
          ))}
          <button className="bg-green-600 px-4 py-2 rounded-md text-white hover:bg-green-400 transition-all">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
