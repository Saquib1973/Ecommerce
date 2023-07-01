import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import Layout from "../../Components/Layout";
import axios from "axios";
import { toast } from "react-hot-toast";

const UserProfile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/auth/profile`,

        {
          name,
          email,
          address,
          phone,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`, //
          },
        }
      );
      if (data.success) {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            }  bg-green-200 border-2 border-green-300 p-2 rounded-xl `}
          >
            <div className="flex gap-2">
              <div className="text-green-500 p-2">Updated Successfully</div>
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
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={`User - ` + auth.user.name}>
      <div className="w-full md:w-[75vw] h-[80vh] flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-green-400 p-4 pt-8 sm:p-10 rounded-md items-center  flex flex-col gap-6"
        >
          <div className="w-auto items-center flex gap-2 ">
            <label htmlFor="" className="text-white">
              Name
            </label>
            <input
              type="text"
              value={name}
              placeholder="Enter Your Name"
              autoFocus
              className="py-2 px-4 outline-none rounded-md tracking-wider"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="w-auto items-center flex gap-2 ">
            <label htmlFor="" className="text-white">
              Name
            </label>
            <input
              type="number"
              value={phone}
              placeholder="Enter Your phone"
              autoFocus
              className="py-2 px-4 outline-none rounded-md tracking-wider"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="w-auto items-center flex gap-2 ">
            <label htmlFor="" className="text-white">
              Name
            </label>
            <input
              type="email"
              value={email}
              placeholder="Enter Your Email"
              autoFocus
              disabled
              className="py-2 px-4 outline-none rounded-md tracking-wider"
            />{" "}
          </div>
          <div className="w-auto items-center flex gap-2 ">
            <label htmlFor="" className="text-white">
              Name
            </label>
            <input
              type="text"
              autoComplete="username"
              value={address}
              placeholder="Enter Your Address"
              autoFocus
              className="py-2 px-4 outline-none rounded-md tracking-wider"
              onChange={(e) => setAddress(e.target.value)}
            />{" "}
          </div>
          <div className="w-auto items-center flex gap-2 ">
            <label htmlFor="" className="text-white">
              Name
            </label>
            <input
              type="password"
              value={password}
              autoComplete="current-password"
              placeholder="Enter Your password"
              autoFocus
              className="py-2 px-4 outline-none rounded-md tracking-wider"
              onChange={(e) => setPassword(e.target.value)}
            />{" "}
          </div>
          <button className="bg-green-600 p-2 w-1/2 py-2 hover:shadow-md hover:bg-green-200 hover:text-green-600 transition-all rounded-md text-white">
            Update
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default UserProfile;
