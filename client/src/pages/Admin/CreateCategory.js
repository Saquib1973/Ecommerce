import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import CategoryForm from "./../../Components/Form/CategoryForm";
import { Modal } from "antd";
import Loading from "../../Components/Loading";
import { toast } from "react-hot-toast";
const CreateCategory = () => {
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingCat, setLoadingCat] = useState(false);
  // const showModal = () => {
  //   setIsModalOpen(true);
  // };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [auth] = useAuth();
  const [name, setName] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `http://localhost:8080/api/v1/category/create-category`,
        {
          name,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`, //
          },
        }
      );
      if (data.success) {
        setName("");
        getAllCategory();
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
      } else {
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            }  bg-red-200 border-2 border-red-300 p-2 rounded-xl `}
          >
            <div className="flex gap-2">
              <div className="text-red-500 p-2">{data.message}</div>
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
  const [category, setCategory] = useState([]);
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:8080/api/v1/category/update-category/${selected._id}`,
        { name: updatedName },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`, //
          },
        }
      );
      setIsModalOpen(false);
      setSelected(null);
      setUpdatedName("");
      getAllCategory();
      if (data.success) {
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
      } else {
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            }  bg-red-200 border-2 border-red-300 p-2 rounded-xl `}
          >
            <div className="flex gap-2">
              <div className="text-red-500 p-2">{data.message}</div>
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

  const handleDelete = async (id) => {
    try {
      let answer = window.prompt(
        "Are you sure you want to delete , then type 'YES'"
      );
      if (answer !== "YES") return;
      const { data } = await axios.delete(
        `http://localhost:8080/api/v1/category/delete-category/${id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`, //
          },
        }
      );
      setSelected(null);
      getAllCategory();
      if (data.success) {
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
      } else {
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            }  bg-red-200 border-2 border-red-300 p-2 rounded-xl `}
          >
            <div className="flex gap-2">
              <div className="text-red-500 p-2">{data.message}</div>
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
  useEffect(() => {
    getAllCategory();
  }, []);

  const getAllCategory = async () => {
    try {
      setLoadingCat(true);
      const { data } = await axios.get(
        "http://localhost:8080/api/v1/category/get-all-categories"
      );
      if (data.success) {
        setCategory(data.category);
      }
      setLoadingCat(false);
    } catch (error) {
      setLoadingCat(false);
      console.log(error);
    }
  };
  return (
    <Layout title={"Create Category"}>
      <div className="w-full md:w-[75vw] flex flex-col items-center justify-start py-6">
        <div className="h-1/3 mx-4 px-4">
          <h1 className="text-2xl flex flex-col items-center text-green-500 py-4">
            Manage Category
            <div className="w-1/2 h-2 bg-green-300 rounded-3xl" />
          </h1>
          <div>
            <CategoryForm
              handleSubmit={handleSubmit}
              value={name}
              setValue={setName}
            />
          </div>
        </div>
        {loadingCat ? (
          <Loading />
        ) : (
          <div className="flex flex-col items-center justify-start h-auto gap-4 p-4 mx-4 md:p-8 rounded-lg bg-green-400">
            <div className="flex w-full justify-between text-white">
              <p className="font-bold italic tracking-wider">Category</p>
              <p className="font-bold italic tracking-wider">Action</p>
            </div>
            {category.map((items) => (
              <div key={items._id} className="w-full text-sm md:text-base">
                <div className="flex w-full gap-4 justify-between  text-white">
                  <p className="w-auto md:w-1/4">{items.name}</p>
                  <div className="w-auto md:w-3/4 flex items-end justify-center">
                    <button
                      className="border-2 border-white hover:bg-green-200 hover:shadow-lg hover:text-green-600 m-1 p-6 py-1"
                      onClick={() => {
                        setUpdatedName(items.name);
                        setIsModalOpen(true);
                        setSelected(items);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-400 m-1 p-4 py-1 hover:bg-red-600 transition-all"
                      onClick={() => {
                        handleDelete(items._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="h-1 w-full bg-gray-200 my-2" />
              </div>
            ))}
            <Modal
              title="Basic Modal"
              open={isModalOpen}
              footer={null}
              onCancel={handleCancel}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CreateCategory;
