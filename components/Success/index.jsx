"use client";
import React, { useEffect, useRef } from "react";
import Confirm from "../Confirm";
import { useRouter } from "next/navigation";
import axios from "axios";

const Success = (props) => {
  const { payid } = props;
  const run = useRef(false);
  const router = useRouter();

  const createOrders = async (token, name_address, products, total) => {
    const { data } = await axios.post(
      "http://localhost:3000/api/createOrder",
      {
        token,
        name_address,
        products,
        total,
        payment_id: payid,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(data);
    clearStorage();
  };

  const delData = async () => {
    const token = localStorage.getItem("token");
    const products = JSON.parse(localStorage.getItem("cart"));
    const name_address = JSON.parse(localStorage.getItem("order"));
    const total = onLoadCalculate(products);
    await createOrders(token, name_address, products, total);
  };
  const clearStorage = () => {
    localStorage.setItem("cart", JSON.stringify([]));
    localStorage.setItem("order", "");
  };

  useEffect(() => {
    if (run.current === false) {
      delData();
    }
    return () => {
      run.current = true;
    };
  }, []);

  const onLoadCalculate = (data) => {
    let tot = 0;
    for (let i = 0; i < data.length; i++) {
      const qty = data[i].qty;
      const price = data[i].price;
      tot += qty * price;
    }
    return tot;
  };

  return (
    <div className="flex flex-col items-center justify-center my-24">
      {payid === "success" ? (
        <div></div>
      ) : (
        <div
          className="bg-green-100 border border-green-400 w-1/2 text-green-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Payment successful! </strong>
          <span className="block">
            Your paymentID= {payid} has been processed.
          </span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg
              className="fill-current h-6 w-6 text-green-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path
                d="M14.293 5.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 11-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.293a1 1 0 111.414-1.414L10 8.586l4.293-4.293z"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
      )}
      <Confirm />
    </div>
  );
};

export default Success;
