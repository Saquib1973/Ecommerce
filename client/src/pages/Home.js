import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { prices } from "./../Components/Prices.js";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart.js";
import img from "../Images/bgg.png";
import Loading from "../Components/Loading";
import { toast } from "react-hot-toast";

const Home = () => {
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [loadingCont, setLoadingCont] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  const getTotalCount = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getAllCategory();
    getTotalCount();
  }, []);

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
    //eslint-disable-next-line
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
    // eslint-disable-next-line
  }, [checked, radio]);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-all-categories"
      );
      if (data.success) {
        setCategory(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProducts = async () => {
    try {
      setPageLoading(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-list/${page}`
      );
      setProducts(data.products);
      setPageLoading(false);
    } catch (error) {
      setPageLoading(false);
      console.log(error);
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  const filterProduct = async () => {
    try {
      setPageLoading(true);
      const { data } = await axios.post(
        `http://localhost:8080/api/v1/product/product-filter`,
        { checked, radio }
      );
      setPageLoading(false);
      setProducts(data?.products);
    } catch (error) {
      setPageLoading(false);
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
    //eslint-disable-next-line
  }, [page]);

  const loadMore = async () => {
    try {
      setLoadingCont(true);
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/product-list/${page}`
      );
      setProducts([...products, ...data.products]);
      setLoadingCont(false);
    } catch (error) {
      setLoadingCont(false);
      console.log(error.message);
    }
  };
  return (
    <Layout title={`All Product`}>
      <div
        style={{
          backgroundImage: `url(${img})`,
        }}
        className="h-[80vh] w-screen bg-cover bg-center bg-fixed  flex items-end text-center text-cyan-600 justify-center"
      >
        <div>
          <p className="text-6xl font-bold overflow-hidden">
            Ecommerce Website
          </p>
          <p className="text-3xl font-bold">
            Shop Phones,Dress <br />
            Shoes and more
          </p>
        </div>
      </div>
      <div className="flex w-full px-1 flex-col md:flex-row md:px-4 my-4 ">
        <div className="w-full md:w-[20%] gap-1 flex-wrap justify-evenly flex flex-row md:flex-col text-white items-center md:pt-[10rem] md:justify-start">
          <div className="bg-green-300  rounded-md p-4">
            <div className="font-light my-2"> Filter by category</div>
            <div className="flex justify-center flex-col gap-1">
              {category.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                  className="text-gray-500"
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>
          </div>
          <div className="flex items-center py-4 justify-center flex-col bg-green-300 p-4 px-6 rounded-md my-1 gap-1">
            <div className="font-light my-2"> Filter by price</div>
            <div>
              <Radio.Group
                onChange={(e) => setRadio(e.target.value)}
                className="flex flex-col justify-center gap-2"
              >
                {prices.map((p) => (
                  <Radio value={p.array} key={p._id} className="text-gray-500">
                    {p.name}
                  </Radio>
                ))}
              </Radio.Group>
            </div>
          </div>
          <button
            onClick={() => {
              window.location.reload(true);
            }}
            className="bg-red-400 text-white px-6 py-2 rounded-md my-2 active:scale-95 hover:bg-red-600 transition-all"
          >
            Reset
          </button>
        </div>
        <div className="w-full md:w-[80%] mx-2">
          {pageLoading ? (
            <Loading text={`products`} />
          ) : (
            <div className="flex flex-col gap-4">
              <div className="text-4xl text-green-500 flex flex-col items-center justify-center">
                <div>
                  All Products
                  <div className="h-2 w-auto rounded-full my-2 bg-green-500" />
                </div>
              </div>
              <div className="flex items-center justify-center gap-8 flex-wrap text-gray-500 hover:text-gray-600">
                {products?.map((product) => (
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
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="flex items-center mt-10 justify-center py-2">
            {products?.length < total && (
              <button
                onClick={() => {
                  setPage(page + 1);
                }}
                className="bg-yellow-400 p-2 rounded-sm"
              >
                {loadingCont ? "Loading..." : "Load More Products"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
