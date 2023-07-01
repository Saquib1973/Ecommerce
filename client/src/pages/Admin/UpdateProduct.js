import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";
const { Option } = Select;
const UpdateProduct = () => {
  const params = useParams();
  const [auth] = useAuth();
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [id, setId] = useState("");
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
  useEffect(() => {
    getSingleProduct();
    // setData({...data,photo:})
    //eslint-disable-next-line
  }, []);
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/v1/product/get-product/${params.slug}`
      );
      setId(data.product._id);
      setData({
        name: data.product.name,
        description: data.product.description,
        price: data.product.price,
        quantity: data.product.quantity,
        category: data.product.category._id,
        shipping: data.product.shipping,
        photo: `http://localhost:8080/api/v1/product/product-photo/${data.product._id}`,
      });
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
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", data.name);
      productData.append("description", data.description);
      productData.append("price", data.price);
      productData.append("quantity", data.quantity);
      productData.append("category", data.category);
      productData.append("shipping", data.shipping);

      if (data.photo instanceof File) {
        // Check if a new image is selected
        productData.append("photo", data.photo);
      }

      const res = await axios.put(
        `http://localhost:8080/api/v1/product/update-product/${id}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      if (res.data.success) {
        navigate("/dashboard-admin/products");
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

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      let answer = window.prompt(
        "Are you sure you want to delete , then type 'YES'"
      );
      if (answer !== "YES") return;
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/product/delete-product/${id}`
      );
      toast.custom((t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          }  bg-green-200 border-2 border-green-300 p-2 rounded-xl `}
        >
          <div className="flex gap-2">
            <div className="text-green-500 p-2">{data.message}</div>
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
      navigate(`/dashboard-admin/products`);
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
  return (
    <Layout title={"Create Product"}>
      <div className="flex h-[90vh] w-[75vw] flex-col items-center justify-center">
        <p className="text-2xl text-green-500">Update Product</p>

        <form className="bg-green-300 rounded-md p-12 flex flex-col gap-4">
          <div className="w-full items-center flex gap-2 ">
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
              value={data?.category}
            >
              {category.map((items) => (
                <Option key={items._id} value={items._id}>
                  {items.name}
                </Option>
              ))}
            </Select>
          </div>
          <div className="image flex justify-evenly items-center w-full h-auto  py-2 ">
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
              Image
            </label>

            {!data.photo ? (
              <>
                <img
                  src={data.photo}
                  alt="Product"
                  className="h-20 w-2h-20 rounded-md"
                />
              </>
            ) : (
              <img
                src={
                  data.photo instanceof File
                    ? URL.createObjectURL(data.photo)
                    : data.photo
                }
                alt="Product"
                className="h-20 w-2h-20 rounded-md"
              />
            )}
          </div>
          <input
            name="name"
            type="text"
            placeholder="Enter name"
            className="text-lg px-4 w-full py-1"
            value={data.name}
            onChange={handleChange}
          />
          <textarea
            name="description"
            type="text"
            placeholder="Enter description"
            value={data.description}
            className="text-lg px-6 w-full py-1"
            onChange={handleChange}
          />
          <input
            name="price"
            type="number"
            placeholder="Enter price"
            value={data.price}
            className="text-lg px-4 w-full py-1"
            onChange={handleChange}
          />
          <input
            name="quantity"
            type="number"
            placeholder="Enter quantity"
            className="text-lg px-4 w-full py-1"
            value={data.quantity}
            onChange={handleChange}
          />
          <div className="flex items-center gap-2">
            <label htmlFor="">Shipping :</label>

            <Select
              placeholder="Shipping"
              size="medium"
              showSearch
              onChange={(value) => {
                setData({
                  ...data,
                  shipping: value === "0" || value === false ? 0 : 1,
                });
              }}
              value={data.shipping === 0 || data.shipping === false ? "0" : "1"}
            >
              <Option value="1">Yes</Option>
              <Option value="0">No</Option>
            </Select>
          </div>
          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              className="bg-green-800 p-2 w-1/2 py-2 hover:shadow-md hover:bg-green-200 hover:text-green-600 transition-all rounded-md text-white"
            >
              {" "}
              Submmit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-300 p-2 w-1/2 py-2 hover:shadow-md hover:bg-red-500 hover:text-white transition-all rounded-md text-white"
            >
              {" "}
              Delete
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
