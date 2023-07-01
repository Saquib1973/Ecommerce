import { NavLink } from "react-router-dom";

import React from "react";
import { Link } from "react-router-dom";
import {
  AiFillGithub,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillTwitterCircle,
} from "react-icons/ai";
function Footer() {
  return (
    <div className="px-4 py-6 md:py-8 border-t-4 border-black bg-white flex justify-center items-center flex-col md:flex-row md:justify-between">
      <span className="text-sm text-gray-500 sm:text-center">
        © 2023{" "}
        <Link to="https://saquib-ali.web.app/" target="_blank">
          Saquib™
        </Link>
        . All Rights Reserved.
      </span>
      <div className="overflow-hidden text-lg md:text-2xl">
        <NavLink
          className="border-b-2 mx-4  border-transparent hover:border-gray-500"
          to="/about"
        >
          About
        </NavLink>
        <NavLink
          className="border-b-2 mx-4  border-transparent hover:border-gray-500"
          to="/contact"
        >
          Contact
        </NavLink>
        <NavLink
          className="border-b-2 mx-4  border-transparent hover:border-gray-500"
          to="/policy"
        >
          Policy
        </NavLink>
      </div>
      <div className="flex mt-4 space-x-6 sm:justify-center md:mt-0">
        <Link
          to="https://www.linkedin.com/in/saquib-ali-4a3235219/"
          target="_blank"
          className="hover:text-red-400 text-2xl md:text-3xl "
        >
          <AiFillLinkedin />
        </Link>
        <Link
          to="https://www.instagram.com/kooky._.cookie/"
          target="_blank"
          className="hover:text-red-400 text-2xl md:text-3xl "
        >
          <AiFillInstagram />
        </Link>
        <Link
          to="https://twitter.com/drake_spirit"
          target="_blank"
          className="hover:text-red-400 text-2xl md:text-3xl "
        >
          <AiFillTwitterCircle />
        </Link>
        <Link
          to="https://github.com/Saquib1973"
          target="_blank"
          className="hover:text-red-400 text-2xl md:text-3xl "
        >
          <AiFillGithub />
        </Link>
      </div>
    </div>
  );
}

export default Footer;
