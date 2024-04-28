"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const index = () => {
  const router = useRouter();
  return (
    <div>
      <div className="flex flex-col items-center py-20 px-32 my-4 bg-blue-50 rounded">
        <p className="font-bold text-gray-800 text-4xl my-2">
          Thank You! For Shopping With Us
        </p>
        <p className="font-bold text-gray-800 text-4xl my-2">
          May you have a good day {"<3"}
        </p>
        <p className="font-bold text-gray-800 text-4xl my-2">Cheers🍻</p>
        <button
          onClick={() => {
            router.push("/");
          }}
          className="border-blue-950 border-2 my-5 p-3 bg-blue-950 text-white text-lg font-semibold tracking-widest  rounded"
        >
          Do More Shopping!
        </button>
      </div>
    </div>
  );
};

export default index;
