import React, { use, useState } from "react";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { TbBrandMeta } from "react-icons/tb";
import { FiPhoneCall } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";

const Footer = () => {
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/subscribe`,
      { email } // send as object, not plain string
    );
    console.log("------------->",response.status)
  };

  return (
    <footer className=" border-t py-12">
      <div className=" container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0">
        <div>
          <h3 className=" text-lg text-gray-800 mb-4">Newslatter</h3>
          <p className=" text-gray-500 mb-4">
            Be the first to here about new Products , exclusive events and
            online offers
          </p>
          <p className=" font-medium text-sm text-gray-600 mb-6">
            {" "}
            Sign up and get 10% off your first order .
          </p>
          <form className="flex" onSubmit={handleSubmit}>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="p-3 w-full text-sm border-t border-l border-b border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
              required
            />
            <button
              type="submit"
              className="bg-black text-white px-6 py-3 text-sm rounded-r-md hover:bg-gray-800 transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* shop links */}
        <div>
          <h3 className=" text-lg text-gray-800 mb-4">Shop</h3>
          <ul className=" space-y-2 text-gray-600">
            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors ">
                Womens top wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors ">
                Mens top wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors ">
                Mens bottom wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors ">
                Mens bottom wear
              </Link>
            </li>
          </ul>
        </div>
        {/*  support links */}
        <div>
          <h3 className=" text-lg text-gray-800 mb-4">Support</h3>
          <ul className=" space-y-2 text-gray-600">
            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors ">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors ">
                About Us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors ">
                Faqs
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors ">
                Features
              </Link>
            </li>
          </ul>
        </div>

        {/* Follow Us */}

        <div>
          <h3 className="  text-lg text-gray-800 mb-4 ">
            <div className=" flex items-center space-x-4 mb-6">
              <a
                href=""
                target="_blank"
                rel="noopener noreffer"
                className=" hover:text-gray-300"
              >
                <TbBrandMeta className=" h-5 w-5"></TbBrandMeta>
              </a>
              <a
                href=""
                target="_blank"
                rel="noopener noreffer"
                className=" hover:text-gray-300"
              >
                <IoLogoInstagram className=" h-5 w-5"></IoLogoInstagram>
              </a>
              <a
                href=""
                target="_blank"
                rel="noopener noreffer"
                className=" hover:text-gray-300"
              >
                <RiTwitterXLine className=" h-4 w-4"></RiTwitterXLine>
              </a>
            </div>
            <p className=" text-gray-500 ">Call Us</p>
            <p>
              <FiPhoneCall className=" inline-block mr-2 "></FiPhoneCall>
              0123-456-789
            </p>
          </h3>
        </div>
      </div>
      {/* Footer Bottom */}
      <div className=" container mx-auto mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6 ">
        <p className=" text-gray-500 text-sm tracking-tight  tex ">
          2025,CompileTab . All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
