"use client";
import React, { useState } from "react";
import Link from "next/link";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { RiAccountCircleLine } from "react-icons/ri";
import Image from "next/image";
import trijon from "../../images/trijon.png";
import { RxHamburgerMenu } from "react-icons/rx";

const index = (props) => {
  const [toggle, setToggle] = useState(false);
  const { token, setToken } = props;
  return (
    <>
      <header className="text-gray-600 shadow-md body-font w-full fixed top-0 right-0 left-0 bg-white z-10">
        <div>
          <RxHamburgerMenu className="font-bold text-black absolute md:-top-32 top-4 left-5 text-3xl" />
        </div>
        <div className="flex p-3 md:p-5 flex-col container h-[65px] mx-auto items-center md:justify-between md:flex-row md:relative">
          <Link
            href={"/"}
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <Image src={trijon} width={40} height={40} alt="Trijan Logo" />
            <span className="ml-4 text-[22px] text-gray-700 tracking-widest font-bold">
              TRIJON
            </span>
          </Link>
          <nav className="flex flex-wrap md:flex-row items-start absolute top-10 left-3 flex-col md:-mt-20 md:items-center text-base justify-center md:relative">
            <Link
              href={"/tshirt"}
              className="mx-4 flex justify-center items-center hover:border-b-4 hover:border-b-gray-700 hover:-mb-1 h-[62px] text-sm montserrat-700 hover:text-gray-700"
            >
              <p>TSHIRT</p>
            </Link>
            <Link
              href={"/trousers"}
              className="mx-4 flex justify-center items-center hover:border-b-4 hover:border-b-gray-700 hover:-mb-1 h-[62px] text-sm montserrat-700 hover:text-gray-700"
            >
              <p>JEANS</p>
            </Link>
            <Link
              href={"/underwear"}
              className="mx-4 flex justify-center items-center hover:border-b-4 hover:border-b-gray-700 hover:-mb-1 h-[62px] text-sm montserrat-700 hover:text-gray-700"
            >
              <p>UNDER GARMENTS</p>
            </Link>
          </nav>
          <div className="flex justify-between -mt-3 items-center w-20 md:relative absolute top-6 right-2 md:-mt-12">
            <div
              className="relative"
              onMouseEnter={() => {
                setToggle(true);
              }}
              onMouseLeave={() => {
                setToggle(false);
              }}
            >
              <RiAccountCircleLine
                className="text-4xl w-10 cursor-pointer text-gray-800 mr-2 "
                onMouseEnter={() => {
                  setToggle(true);
                }}
                onMouseLeave={() => {
                  setToggle(false);
                }}
              />
              {toggle && (
                <div
                  className="absolute flex w-32 py-2 flex-col bg-gray-700 rounded text-[15px] top-9 right-3 font-semibold text-white items-start"
                  onMouseEnter={() => {
                    setToggle(true);
                  }}
                  onMouseLeave={() => {
                    setToggle(false);
                  }}
                >
                  <button className="w-auto ml-4 py-1">My Account</button>
                  <button className="w-auto ml-4 py-1">Orders</button>
                  {token.token && (
                    <button
                      onClick={() => {
                        localStorage.setItem("token", null);
                        setToken({ token: null });
                        // console.log(token.token == "null");
                      }}
                      className="w-auto ml-4 py-1"
                    >
                      Logout
                    </button>
                  )}
                  {!token.token && (
                    <Link href={"/login"} className="w-auto ml-4 py-1">
                      Login
                    </Link>
                  )}
                </div>
              )}
            </div>
            {/* {!token.token && (
              <Link
                href={"/login"}
                className="py-1.5 newFont px-3 bg-gray-800 text-xl text-white mr-2"
              >
                Login
              </Link>
            )} */}
            <Link href={"/cart"} className="w-10">
              <PiShoppingCartSimpleBold className="text-4xl text-gray-800 p-1" />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default index;
