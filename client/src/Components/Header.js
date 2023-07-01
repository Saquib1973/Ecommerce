import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import SearchInput from "./Form/SearchInput.js";
import useCategory from "../hook/useCategory";
import { useCart } from "../context/cart";
import { toast } from "react-hot-toast";
function Header() {
  useEffect(() => {
    let screen = window.innerWidth;
    if (screen < 698) {
      setHeader(true);
    }
  }, []);

  //variables
  const [cart] = useCart();
  const category = useCategory();
  const openRef = useRef();
  const catRef = useRef();
  const [catOpen, setCatOpen] = useState(false);
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [open, setOpen] = useState(false);
  const [header, setHeader] = useState(false);

  useEffect(() => {
    if (catOpen || open) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [catOpen, open]);

  //handle logout function
  const handleLogout = () => {
    setAuth({
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    if (window.innerWidth < 698) setHeader(true);
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        }  bg-red-200 border-2 border-red-300 p-2 rounded-xl `}
      >
        <div className="flex gap-2">
          <div className="text-red-500 p-2">Logged Out</div>
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
  };

  //EventListener for ref variables
  window.addEventListener("click", (e) => {
    if (e.target !== openRef.current) {
      setOpen(false);
    }
    if (e.target !== catRef.current) {
      setCatOpen(false);
    }
  });

  return (
    <div className="flex flex-col lg:flex-row items-center gap-4 justify-around py-4 bg-green-300 px-10 ">
      <NavLink
        className="text-3xl  hidden lg:block  transition-all w-1/6  text-white hover:tracking-widest"
        to="/"
      >
        Home
      </NavLink>
      <div className="flex justify-between gap-4 w-full lg:w-2/6">
        <SearchInput className="" />
        <div
          className="flex flex-col mt-4 gap-1 md:hidden"
          onClick={() => {
            setHeader(!header);
          }}
        >
          <div className="w-10 h-1 rounded-sm bg-black" />
          <div className="w-10 h-1 rounded-sm bg-black" />
          <div className="w-10 h-1 rounded-sm bg-black" />
        </div>
      </div>
      {!header && (
        <div className="flex md:flex-row mt-4 md:mt-0 flex-col items-start justify-around w-full lg:w-3/6 gap-4 lg:gap-8 text-xl md:items-center text-white">
          <>
            <NavLink
              className="text-2xl p-2  transition-all lg:hidden block text-white"
              to="/"
              onClick={() => {
                if (window.innerWidth < 698) setHeader(true);
              }}
            >
              Home
            </NavLink>
            <div className="flex ">
              <div
                ref={catRef}
                onClick={() => {
                  setCatOpen(!catOpen);
                }}
                className={`cursor-pointer  border-b-4 border-transparent ${
                  catOpen
                    ? "border-green-500 border-b-4 text-green-600 tracking-widest"
                    : ""
                } hover:border-green-600 hover:text-green-600 p-1 px-2 text-center transition-all`}
              >
                Category
              </div>
              {catOpen && (
                <ul className="absolute top-[5.1rem] gap-2 md:top-[8.8rem] lg:top-[5.1rem] left-40 md:left-[30vw] lg:left-[55vw] rounded-md flex flex-col items-start bg-green-400 p-2 cursor-pointer">
                  <li className="border-b-2 border-transparent px-2 hover:border-white transition-all">
                    <Link
                      to={`/categories`}
                      onClick={() => {
                        if (window.innerWidth < 698) setHeader(true);
                      }}
                    >
                      ALL Category
                    </Link>
                  </li>
                  {category?.map((c) => (
                    <li
                      key={c._id}
                      className="border-b-2 px-2 border-transparent hover:border-white transition-all w-full"
                    >
                      <Link
                        to={`/categories/category/${c.slug}`}
                        onClick={() => {
                          if (window.innerWidth < 698) setHeader(true);
                        }}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
          {auth.user ? (
            <div className="">
              <div>
                <div
                  ref={openRef}
                  onClick={() => {
                    setOpen(!open);
                  }}
                  className={`cursor-pointer  border-b-4 border-transparent hover:border-green-600 hover:text-green-600 p-1 px-2 text-center transition-all
                ${
                  open
                    ? "border-green-500 border-b-4 text-green-600 tracking-widest"
                    : ""
                }
                `}
                >
                  {auth.user.role === 1 ? "Admin" : "User"}
                </div>
                {open && (
                  <ul className="absolute top-[12rem] md:top-[8.8rem] lg:top-[5.1rem] left-40 md:left-[56vw] lg:left-[71vw] gap-2 rounded-md flex flex-col items-start bg-green-400 p-2 cursor-pointer">
                    <li
                      className="hover:bg-green-200 px-2 py-1 rounded-md transition-all hover:text-green-400"
                      onClick={() => {
                        if (window.innerWidth < 698) setHeader(true);
                        navigate(
                          `/dashboard-${
                            auth.user.role === 1 ? "admin" : "user"
                          }`
                        );
                      }}
                    >
                      Dashboard
                    </li>
                    <li
                      onClick={handleLogout}
                      className="bg-red-400 w-full py-1 text-center rounded-lg shadow-md shadow-red-200 hover:bg-red-500 active:scale-95 transition-all"
                    >
                      Logout
                    </li>
                  </ul>
                )}
              </div>
            </div>
          ) : (
            <div className=" justify-around flex">
              <NavLink
                className="p-2 border-b-4 border-transparent hover:border-green-600 hover:text-green-600 text-center transition-all"
                to="/login"
                onClick={() => {
                  if (window.innerWidth < 698) setHeader(true);
                }}
              >
                Login
              </NavLink>
              <NavLink
                onClick={() => {
                  if (window.innerWidth < 698) setHeader(true);
                }}
                className="p-2 border-b-4 border-transparent hover:border-green-600 hover:text-green-600 text-center transition-all"
                to="/register"
              >
                Register
              </NavLink>
            </div>
          )}
          <NavLink
            className="p-2   border-b-4 border-transparent hover:border-green-600 hover:text-green-600 text-center transition-all"
            to="/cart"
            onClick={() => {
              if (window.innerWidth < 698) setHeader(true);
            }}
          >
            Cart({cart.length})
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default Header;
