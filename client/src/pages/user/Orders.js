import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import Layout from "./../../Components/Layout";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const [show, setShow] = useState(null);

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/auth/orders",
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

  useEffect(() => {
    if (auth?.token) getOrders();
    //eslint-disable-next-line
  }, [auth?.token]);
  return (
    <Layout title={"Your Orders"}>
      <div className="w-full px-2 md:w-[70vw] flex my-4 gap-4 justify-center items-center flex-col">
        <div className="text-3xl text-green-500">All Orders</div>
        <div className=" flex text-sm md:text-xl justify-between items-center w-full">
          <p className="w-1/9">#</p>
          <p className="w-2/9">Status</p>
          <p className="w-2/9">Buyer</p>
          <p className="w-2/9">Time</p>
          <p className="w-2/9">Payment</p>
          <p className="w-2/9">Quantity</p>
        </div>
        <div className="bg-black h-1 w-full" />
        {orders.map((o, i) => (
          <div
            key={i}
            onClick={() => (show === null ? setShow(i) : setShow(null))}
            className="flex flex-col w-full items-center justify-between my-2"
          >
            <div className="md:text-xl text-sm flex justify-between items-center w-full">
              <p className="w-1/9">{i + 1}.</p>
              <p className="w-2/9">{o.status}</p>
              <p className="w-2/9">{o.buyer.name}</p>
              <p className="w-2/9">
                {o.createdAt.split("T")[0].split("-").reverse().join("-")}
              </p>
              <p className="w-2/9">{o?.payemeny?.transaction?.id}</p>
              <p className="w-2/9">{o.products.length}</p>
            </div>
            <div
              className={`bg-gray-600 p-6 flex gap-2 flex-wrap ${
                show === i ? "block" : "hidden"
              }`}
            >
              {o.products.map((item) => (
                <div key={item._id}>
                  <img
                    src={`http://localhost:8080/api/v1/product/product-photo/${item._id}`}
                    alt=""
                    className="w-20 h-20"
                  />
                  <p>Name : {item.name}</p>
                  <div className="flex gap-2">
                    <p>Price : ${item.price}</p>
                  </div>
                  <div className="w-[20vw]">
                    {item.description.substring(0, 60)}...
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gray-400 h-[2px] w-full" />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Orders;
