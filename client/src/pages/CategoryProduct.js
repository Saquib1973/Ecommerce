import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/cart";
import Loading from "./../Components/Loading";
import { toast } from "react-hot-toast";

const CategoryProduct = () => {
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const params = useParams();
  const [product, setProduct] = useState([]);
  const [cat, setCat] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);
  const getProductByCat = async () => {
    try {
      setPageLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-category/${params.slug}`
      );
      setPageLoading(false);
      setProduct(data?.product);
      setCat(data?.category);
    } catch (error) {
      setPageLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    if (params?.slug) getProductByCat();
    //eslint-disable-next-line
  }, [params?.slug]);
  return (
    <Layout>
      {pageLoading ? (
        <Loading />
      ) : (
        <div className="flex flex-col items-center justify-evenly py-4 w-full">
          <div className="text-center">
            <div className="text-4xl text-green-500 flex flex-col items-center justify-center">
              <div className="fle flex-col items-center mb-4">
                <p className="text-3xl">{cat?.name} : Category</p>
                <div className="h-2 w-auto rounded-full bg-green-500" />
              </div>
            </div>

            <p className="text-md text-gray-600">
              {product?.length} {product?.length > 1 ? "Products" : "Product"}{" "}
              found
            </p>
          </div>
          <div className="flex flex-col items-center justify-center mx-4">
            <div className="mb-2">
              {product?.length !== 0
                ? "These are the products we found : "
                : ""}
            </div>
            <div className="flex items-center justify-center gap-8 flex-wrap">
              {product.map((product) => (
                <div
                  key={product._id}
                  className="flex flex-col justify-center items-center p-2 border-2 hover:shadow-lg hover:bg-green-200 transition-all duration-500 border-green-300 rounded-lg bg-gray-200 gap-2"
                >
                  <img
                    src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
                    alt=""
                    className="w-32 h-32 rounded-md"
                  />
                  <div className="w-full flex justify-between items-center">
                    <p>Name : {product.name}</p>
                    <div className="flex flex-col items-center justify-center">
                      <p>Price : ${product.price}</p>
                      <p>Quantity : {product.quantity}</p>
                    </div>
                  </div>
                  <div className="w-[20vw]">
                    {product.description.substring(0, 60)}...
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="bg-blue-300 rounded-md p-2 px-5 hover:bg-blue-500 transition-all duration-500 hover:text-white"
                      onClick={() => {
                        navigate(`/product/${product.slug}`);
                      }}
                    >
                      More Detail
                    </button>
                    <button
                      className="bg-blue-300 rounded-md p-2 px-5 hover:bg-blue-500 transition-all duration-500 hover:text-white"
                      onClick={() => {
                        setCart([...cart, product]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, product])
                        );
                        toast.custom((t) => (
                          <div
                            className={`${
                              t.visible ? "animate-enter" : "animate-leave"
                            }  bg-green-200 border-2 border-green-300 p-2 rounded-xl `}
                          >
                            <div className="flex gap-2">
                              <div className="text-green-500 p-2">
                                {product.name} Added to cart
                              </div>
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
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default CategoryProduct;
