import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";
const { Option } = Select;
const CreateProduct = () => {
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    quantity: "",
    shipping: "",
    photo: "",
  });
  useEffect(() => {
    getAllCategory();
  }, []);
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
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
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
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("started");
    try {
      const productData = new FormData();
      productData.append("name", data.name);
      productData.append("description", data.description);
      productData.append("price", data.price);
      productData.append("quantity", data.quantity);
      productData.append("photo", data.photo);
      productData.append("category", data.category);
      productData.append("shipping", data.shipping);
      const res = await axios.post(
        `http://localhost:8080/api/v1/product/create-product`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`, //
          },
        }
      );
      if (res.data.success) {
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
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
        navigate("/dashboard-admin/products");
      } else {
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
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
      console.log(error);
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
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
  console.log(data.shipping);

  return (
    <Layout title={"Create Product"}>
      <div className="w-[75vw] flex flex-col items-center justify-center">
        <div className="text-2xl flex flex-col items-center text-green-500 py-4">
          CreateProduct
          <div className="w-2/3 h-2 bg-green-300 rounded-3xl" />
        </div>
        <form className="bg-green-400 p-10 rounded-md items-center  flex flex-col gap-6">
          <div className="w-auto items-center flex gap-2 ">
            <label htmlFor="" className="text-white">
              Select Cagtegory
            </label>
            <Select
              bordered={false}
              placeholder={`Select a category`}
              size="large"
              showSearch
              className="form-select bg-white rounded-xl"
              onChange={(value) => {
                setData({ ...data, category: value });
              }}
            >
              {category.map((items) => (
                <Option key={items._id} value={items._id}>
                  {items.name}
                </Option>
              ))}
            </Select>
          </div>
          <div className="image flex items-center gap-4 justify-center  py-2 ">
            <label className="bg-white py-2 text-green-500 px-4 rounded-lg">
              {data.photo ? data.photo.name : "Select Photo"}
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  setData({ ...data, photo: e.target.files[0] });
                }}
              />
            </label>
            {data.photo && (
              <img
                src={URL.createObjectURL(data.photo)}
                alt="alt"
                className="h-20 w-20"
              />
            )}
          </div>
          <input
            name="name"
            type="text"
            placeholder="Enter name"
            value={data.name}
            onChange={handleChange}
            className="text-lg px-4 w-full py-1"
          />
          <textarea
            name="description"
            type="text"
            placeholder="Enter description"
            value={data.description}
            onChange={handleChange}
            className="text-lg px-6 w-full py-1"
          />
          <input
            name="price"
            type="number"
            placeholder="Enter price"
            value={data.price}
            onChange={handleChange}
            className="text-lg px-4 w-full py-1"
          />
          <input
            name="quantity"
            type="number"
            placeholder="Enter quantity"
            value={data.quantity}
            onChange={handleChange}
            className="text-lg px-4 w-full py-1"
          />
          <div className="flex items-center gap-2">
            <label htmlFor="">Shipping :</label>
            <Select
              placeholder="Shipping"
              size="medium"
              showSearch
              onChange={(value) => {
                setData({ ...data, shipping: value });
              }}
            >
              <Option value="1">Yes</Option>
              <Option value="0">No</Option>
            </Select>
          </div>

          <button
            onClick={handleSubmit}
            className="bg-green-800 p-2 w-1/2 py-2 hover:shadow-md hover:bg-green-200 hover:text-green-600 transition-all rounded-md text-white"
          >
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default CreateProduct;
