import React, { useEffect, useState } from "react";
import Layout from "./../Components/Layout";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import { toast } from "react-hot-toast";
const CartPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  //eslint-disable-next-line
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const [auth] = useAuth();

  const getPayementToken = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/braintree/token`
      );
      setClientToken(data?.response?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  const handlePayment = async () => {
    try {
      if (clientToken === "") {
        await getPayementToken();
        return;
      }
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      //eslint-disable-next-line
      const { data } = await axios.post(
        `http://localhost:8080/api/v1/product/braintree/payment`,
        {
          nonce,
          cart,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`, //
          },
        }
      );

      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard-user/orders");
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          }  bg-green-200 border-2 border-green-300 p-2 rounded-xl `}
        >
          <div className="flex gap-2">
            <div className="text-green-500 p-2">Order Placed</div>
            <button
              onClick={() => {
                toast.dismiss(t.id);
              }}
              className="animate-pulse active:scale-95 px-2 rounded-md bg-green-400 text-white"
            >
              Close
            </button>
          </div>
        </div>
      ));
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getPayementToken();
    //eslint-disable-next-line
  }, [auth]);
  const price = () => {
    try {
      let total = 0;
      cart?.map((item) => (total += item.price));
      return total;
    } catch (error) {
      console.log(error);
    }
  };
  const removeCartItem = (pid) => {
    try {
      let mycart = [...cart];
      let index = mycart.findIndex((item) => item._id === pid);
      mycart.splice(index, 1);
      setCart(mycart);
      localStorage.setItem("cart", JSON.stringify(mycart));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={`Your Cart`}>
      <div className="h-auto my-4 mb-10 flex flex-col w-full">
        <div className="flex flex-col justify-center items-center my-4">
          <p className="text-lg text-gray-600">Hello {auth?.user?.name} !</p>
          <p className="text-lg text-gray-400">
            You have {cart.length} items in your cart{" "}
            {auth.token ? "" : "Please login to checkout"}
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-around px-1 md:px-[1rem] lg:px-[5rem] w-full">
          <div className="flex w-full md:w-3/5 flex-col items-center md:items-start justify-center">
            <p className="text-xl">Items</p>
            <div className="flex gap-6 items-center justify-center md:gap-8 flex-wrap text-gray-500 hover:text-gray-600">
              {cart.map((i) => (
                <div
                  key={i._id}
                  className="flex flex-col h-96 p-2 px-5 lg:px-2 w-auto justify-between items-center border-2 hover:shadow-lg hover:bg-green-200 transition-all duration-500 border-green-300 rounded-lg bg-gray-200 gap-2"
                >
                  <img
                    src={`http://localhost:8080/api/v1/product/product-photo/${i._id}`}
                    alt=""
                    className="w-20 h-20"
                  />
                  <div className="flex flex-col gap-4">
                    <p>Name: {i.name}</p>
                    <p>Price: {i.price}</p>
                    <div className="w-[30vw] md:w-[20vw]">
                      Description :{i.description.substring(0, 60)}...
                    </div>
                    <button
                      className="bg-red-500 p-2 py-2 hover:shadow-md hover:bg-red-200 hover:text-red-600 transition-all rounded-md text-white"
                      onClick={() => {
                        toast.custom((t) => (
                          <div
                            className={`${
                              t.visible ? "animate-enter" : "animate-leave"
                            } bg-red-200 border-2 border-red-300 p-2 rounded-xl `}
                          >
                            <div className="flex gap-2">
                              <div className="text-red-500 p-2">
                                {i.name} removed from your cart
                              </div>
                              <button
                                onClick={() => {
                                  toast.dismiss(t.id);
                                }}
                                className="animate-pulse active:scale-95 px-2 rounded-md bg-red-400 text-white"
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        ));
                        removeCartItem(i._id);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full pt-[5rem] md:w-2/5 flex flex-col gap-4 items-center justify-start">
            <p className="text-2xl text-green-500">Checkout</p>
            <p className="text-gray-600">Total Amount : {price()}</p>
            {auth?.user?.address ? (
              <div className="flex flex-col gap-4 justify-center items-center">
                Current Address : {auth?.user?.address}
                <button
                  onClick={() => {
                    navigate(`/dashboard-user`);
                  }}
                  className="bg-red-500 p-2 py-2 hover:shadow-md hover:bg-red-200 hover:text-red-600 transition-all rounded-md text-white"
                >
                  Update Address
                </button>
                {!clientToken || !cart?.length ? (
                  ""
                ) : (
                  <div className=" p-6 flex items-center justify-center flex-col ">
                    <div className="w-auto h-auto overflow-hidden">
                      <DropIn
                        options={{
                          authorization: clientToken,
                          // paypal: {
                          //   flow: "vault",
                          // },
                        }}
                        onInstance={(instance) => setInstance(instance)}
                        disabled={!auth?.user?.address || !loading}
                      />
                    </div>
                    <button
                      className="bg-green-800 p-2 py-2 hover:shadow-md hover:bg-green-200 hover:text-green-600 transition-all rounded-md text-white"
                      onClick={handlePayment}
                    >
                      {loading ? "Loading..." : "Make Payement"}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => {
                  navigate(
                    `/login`,

                    {
                      state: "/cart",
                    }
                  );
                }}
                className="bg-red-400 hover:bg-red-500 transition-all rounded-md p-2 px-4 text-white "
              >
                Please Login to checkout
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
