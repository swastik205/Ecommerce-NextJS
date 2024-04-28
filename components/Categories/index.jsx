"use client";
import React, { useState } from "react";
import { LiaTshirtSolid } from "react-icons/lia";
import { PiPantsLight } from "react-icons/pi";
import { GiUnderwear } from "react-icons/gi";
import { PiShirtFoldedLight } from "react-icons/pi";
import { GiUnderwearShorts } from "react-icons/gi";
import Products from "../../components/Products";
import sherwani from "../../public/clothing.png";
import sherwani2 from "../../public/clothing1.png";
import Image from "next/image";

const index = () => {
  const [ethnic, setEthnic] = useState(sherwani);
  return (
    <div className="container flex mx-auto justify-between">
      <button className="mx-1 bg-blue-50/60 h-36 w-48 hover:bg-gray-800 hover:text-white flex flex-col items-center justify-center">
        <LiaTshirtSolid className="h-16 w-16" />
        <div className="mt-2 font-light text-sm">T-Shirt</div>
      </button>
      <button className="mx-1 bg-blue-50/60 h-36 w-48 hover:bg-gray-800 transition-transform hover:text-white flex flex-col items-center justify-center">
        <PiPantsLight className="h-16 w-16" />
        <div className="mt-2 font-light text-sm">Trousers</div>
      </button>
      <button className="mx-1 bg-blue-50/60 h-36 w-48 hover:bg-gray-800 hover:text-white flex flex-col items-center justify-center">
        <PiShirtFoldedLight className="h-16 w-16" />
        <div className="mt-2 font-light text-sm">Shirt</div>
      </button>
      <button
        onMouseEnter={() => {
          setEthnic(sherwani);
        }}
        onMouseLeave={() => {
          setEthnic(sherwani2);
        }}
        className="mx-1 bg-blue-50/60 h-36 w-48 hover:bg-gray-800 hover:text-white flex flex-col items-center justify-center"
      >
        <div className="img">
          <Image src={ethnic} alt="EthnicWear" className="h-16 w-16" />
        </div>
        <div className="mt-2 font-light text-sm">Ethnic Wear</div>
      </button>
      <button className="mx-1 bg-blue-50/60 h-36 w-48 hover:bg-gray-800 hover:text-white flex flex-col items-center justify-center">
        <GiUnderwear className="h-16 w-16" />
        <div className="mt-2 font-light text-sm">Under-Wear</div>
      </button>
      <button className="mx-1 bg-blue-50/60 h-36 w-48 hover:bg-gray-800 hover:text-white flex flex-col items-center justify-center">
        <GiUnderwearShorts className="h-16 w-16" />
        <div className="mt-2 font-light text-sm">Boxers</div>
      </button>
    </div>
  );
};

export default index;
