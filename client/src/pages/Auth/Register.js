import React, { useState } from "react";
import Layout from "../../Components/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
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
      const res = await axios.post(`http://localhost:8080/api/v1/auth/register`, {
        name: data.name,
        email: data.email,
        address: data.address,
        phone: data.phone,
        password: data.password,
      });
      if (res.data.success) {
        toast.custom((t) => (
          <div
            className={`${t.visible ? "animate-enter" : "animate-leave"
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
        navigate("/login");
      } else {
        toast.custom((t) => (
          <div
            className={`${t.visible ? "animate-enter" : "animate-leave"
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
      console.log(error.response);
      toast.custom((t) => (
        <div
          className={`${t.visible ? "animate-enter" : "animate-leave"
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
      type: "text",
      placeholder: "Enter your name",
      name: "name",
    },
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
    {
      type: "number",
      placeholder: "Enter your number",
      name: "phone",
    },
    {
      type: "text",
      placeholder: "Enter your Address",
      name: "address",
    },
  ];
  return (
    <Layout title={`Register`}>
      <div className="h-[80vh] flex flex-col gap-4 items-center justify-center">
        <div className="text-4xl text-green-500">Register</div>
        <form
          onSubmit={handleSubmit}
          className="bg-green-200 p-6 py-10 flex flex-col gap-4 items-center justify-center rounded-lg"
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

export default Register;
