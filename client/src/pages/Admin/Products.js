import React, { useEffect, useState } from "react";
import Layout from "./../../Components/Layout";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loadingPage, setLoadingPage] = useState(false);
  const getAllProducts = async () => {
    try {
      setLoadingPage(true);
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/product/get-product"
      );
      setLoadingPage(false);
      setProducts(data.products);
    } catch (error) {
      setLoadingPage(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="w-[75vw] py-4 h-auto">
        {loadingPage ? (
          <Loading text={`Products for ADMIN`} />
        ) : (
          <>
            <div className=" text-3xl text-center py-4">
              <div className="flex flex-col items-center justify-center text-green-400">
                All Products
                <div className="h-2 w-1/4 rounded-full my-2 bg-green-500" />
              </div>
            </div>
            <div className="flex gap-8 items-center justify-center flex-wrap">
              {products.map((product) => (
                <Link
                  to={`/dashboard-admin/product/${product.slug}`}
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
                  <div className="w-[50vw] sm:w-[30vw] md:w-[20vw]">
                    {product.description.substring(0, 60)}...
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Products;
