import React from "react";
import Layout from "./Components/Layout";
import { useSearch } from "./context/search";
import { useCart } from "./context/cart";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [value] = useSearch();
  return (
    <Layout title={`Search results`}>
      <div className=" py-4 w-full flex flex-col items-center justify-start">
        <div className="text-xl text-gray-500 my-6">
          {value.results.length <= 1
            ? `${value.results.length} Product`
            : `${value.results.length} Products`}{" "}
          Found
        </div>
        <div className="flex items-center justify-center gap-8 flex-wrap">
          {value.results.map((product) => (
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
                    alert(`Added to cart`);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
