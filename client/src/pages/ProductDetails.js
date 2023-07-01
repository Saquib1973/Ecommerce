import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/cart";
import Loading from "../Components/Loading";
import { toast } from "react-hot-toast";

const ProductDetails = () => {
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const params = useParams();
  const [loading, setLoading] = useState();
  const [product, setProduct] = useState({});
  const [similar, setSimilar] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    if (params?.slug) getProduct();
    //eslint-disable-next-line
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      setPageLoading(true);
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-product/${params?.slug}`
      );
      setProduct(data?.product);
      relatedProduct(data?.product._id, data?.product.category._id);
      setLoading(false);
      setPageLoading(false);
    } catch (error) {
      setPageLoading(false);
      setLoading(false);
      console.log(error);
    }
  };
  const relatedProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/similar/${pid}/${cid}`
      );
      setSimilar(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      {pageLoading ? (
        <Loading text={`requested product`} />
      ) : (
        <div className="flex flex-col py-5 items-center justify-center">
          {!loading && (
            <div key={product._id} className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row justify-evenly items-center gap-2  bg-green-200 rounded-md p-2 md:p-6 mx-4">
                <img
                  src={`http://localhost:8080/api/v1/product/product-photo/${product?._id}`}
                  alt=""
                  className="w-60 h-60 md:w-80 md:h-80 lg:w-96 lg:h-96 p-4 bg-white rounded-md"
                />
                <div className="flex items-start justify-start px-4 flex-col gap-2 text-green-500">
                  <p>Name : {product.name}</p>
                  <p>Category : {product?.category?.name}</p>
                  <div className="flex gap-2">
                    <p>
                      Price :
                      <span className="text-blue-500 animate-pulse text-xl">
                        {" "}
                        ${product.price}
                      </span>
                    </p>
                    <p>
                      Shipping :{" "}
                      {product.shipping === 0 || product.shipping === false
                        ? "No"
                        : "Yes"}
                    </p>
                    <p>Quantity : {product.quantity}</p>
                  </div>

                  <div className="w-full md:w-[40vw] max-h-[10rem]">
                    {product.description}...
                  </div>
                  <button
                    className="bg-blue-300 rounded-md p-2 px-5 hover:bg-blue-500 transition-all my-3 text-white"
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
                              className="animate-pulse acti px-2 rounded-md bg-green-400 text-white"
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      ));
                    }}
                  >
                    add to cart
                  </button>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center gap-4">
                Similar Product
                <div className="flex items-center justify-center gap-8 flex-wrap">
                  {similar.length > 0 ? (
                    similar.map((product) => (
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
                        <div className="flex justify-evenly w-full items-center gap-2">
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
                                    t.visible
                                      ? "animate-enter"
                                      : "animate-leave"
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
                                      className="animate-pulse acti px-2 rounded-md bg-green-400 text-white"
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
                    ))
                  ) : (
                    <div>no similar product found</div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};

export default ProductDetails;
