import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import Layout from "./../../Components/Layout";
import { Select } from "antd";
import { toast } from "react-hot-toast";
const { Option } = Select;

const AdminOrders = () => {
  const status = ["Not Process", "Processing", "Shipped", "deliverd", "cancel"];
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const [open, setOpen] = useState(-1);

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/auth/all-orders",
        {
          headers: {
            Authorization: `Bearer ${auth.token}`, //
          },
        }
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async (value, orderId) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/auth/order-status/${orderId}`,
        {
          status: value,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`, //
          },
        }
      );
      getOrders();
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          }  bg-green-200 border-2 border-green-300 p-2 rounded-xl `}
        >
          <div className="flex gap-2">
            <div className="text-green-500 p-2">
              {response.data.payemeny.transaction.id} order's status updated to{" "}
              {value}
            </div>
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
      console.log(response);
      console.log(response.data.payemeny.transaction.id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
    //eslint-disable-next-line
  }, [auth?.token]);
  return (
    <Layout>
      <div className="w-full md:w-[75vw] flex my-4 gap-4 justify-center items-center flex-col">
        <div className="text-3xl text-green-500">All Orders</div>
        <div className=" flex text-sm w-[80vw] md:text-xl justify-around">
          <p className="w-1/6 hidden md:block">#</p>
          <p className="w-1/6">Status</p>
          <p className="w-1/6">Buyer</p>
          <p className="w-1/6">Time</p>
          <p className="w-1/6">Payment</p>
          <p className="w-1/6">Quantity</p>
        </div>
        <div className="bg-black h-1 w-full" />
        {orders?.map((o, i) => (
          <div
            key={i}
            className="flex text-sm md:text-xl flex-col w-full items-center justify-center  my-1 md:my-2"
          >
            <div className=" flex justify-between w-[80vw]">
              <p className="w-1/6 hidden md:block">{i + 1}.</p>
              <div className="w-1/6">
                <Select
                  bordered={false}
                  onChange={(value) => {
                    handleChange(value, o._id);
                  }}
                  className="bg-green-200 rounded-lg"
                  defaultValue={o?.status}
                >
                  {status.map((s) => (
                    <Option key={s} value={s}>
                      {s}
                    </Option>
                  ))}
                </Select>
              </div>

              <p className="w-1/6">{o.buyer.name}</p>
              <p className="w-1/6">
                {o.createdAt.split("T")[0].split("-").reverse().join("-")}
              </p>
              <p className="w-1/6">{o?.payemeny?.transaction?.id}</p>
              <p className="w-1/6">{o.products.length}</p>
            </div>
            <button
              className={` p-4 py-2 rounded-md text-white  my-1 md:my-2
              ${
                open === i && open !== -1
                  ? "bg-red-200 hover:bg-red-300"
                  : "bg-blue-200 hover:bg-blue-300"
              }
              `}
              onClick={() => {
                if (open === -1 || open !== i) setOpen(i);
                if (open === i) setOpen(-1);
              }}
            >
              {open === i && open !== -1 ? "Close" : "Order Items"}
            </button>

            {open === i && (
              <div
                className={` p-6 flex gap-2 h-[40vh] w-[80vw] md:w-auto flex-wrap bg-green-50 my-4 rounded-md
              }`}
              >
                {o.products.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-center items-center p-2 border-2 hover:shadow-lg hover:bg-green-200 transition-all duration-500 border-green-300 rounded-lg bg-gray-200 gap-2"
                  >
                    <img
                      src={`http://localhost:8080/api/v1/product/product-photo/${item._id}`}
                      alt=""
                      className="w-20 h-20"
                    />
                    <div>
                      <p>Name : {item.name}</p>
                      <p>Price : ${item.price}</p>
                      <div className="w-[15vw]">
                        {item.description.substring(0, 60)}...
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="bg-gray-400 h-1 w-full" />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default AdminOrders;
