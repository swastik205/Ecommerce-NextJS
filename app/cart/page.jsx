"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Loading from "../../components/Loading";

const cart = () => {
  const [data, setData] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const router = useRouter();

  useEffect(() => {
    try {
      if (localStorage.getItem("cart")) {
        setData(JSON.parse(localStorage.getItem("cart")));
        onLoadCalculate(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      console.error(error);
      localStorage.clear();
    }
  }, []);

  const onLoadCalculate = (data) => {
    let tot = 0;
    for (let i = 0; i < data.length; i++) {
      const qty = data[i].qty;
      const price = data[i].price;
      tot += qty * price;
    }
    setSubTotal(tot);
  };

  const increase = (key) => {
    let cart = JSON.parse(JSON.stringify(data));
    cart[key].qty = cart[key].qty + 1;
    setData(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    onLoadCalculate(JSON.parse(localStorage.getItem("cart")));
  };

  const decrease = (key) => {
    let cart = JSON.parse(JSON.stringify(data));
    cart[key].qty = cart[key].qty - 1;
    if (cart[key].qty == 0) {
      deleteObj(key);
      return;
    }
    setData(cart);
    localStorage.setItem("cart", JSON.stringify(cart));
    onLoadCalculate(JSON.parse(localStorage.getItem("cart")));
  };

  const deleteObj = (key) => {
    let cart2 = [];
    let cart = JSON.parse(JSON.stringify(data));
    for (let i = 0; i < cart.length; i++) {
      if (i == key) {
        continue;
      }
      cart2.push(cart[i]);
    }
    setData(cart2);
    localStorage.setItem("cart", JSON.stringify(cart2));
    onLoadCalculate(JSON.parse(localStorage.getItem("cart")));
  };

  // if (data.length == 0) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <div className="flex justify-center items-center mt-[90px]">
        <p className="text-blue-950 text-3xl font-bold">Shoppping Cart</p>
      </div>
      <section className="text-gray-600 body-font mb-52">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex font-semibold text-sm tracking-wide justify-between items-center mb-10 pb-2 border-b-2">
            <p className="text-gray-400 w-[700px]">Product</p>
            <div className="flex w-full justify-between items-center">
              <p className="text-gray-400">Size</p>
              <p className="text-gray-400">Quantity</p>
              <p className="text-gray-400 pl-12">Price</p>
              <p className="text-gray-400">Delete</p>
            </div>
          </div>
          <div className="flex flex-wrap -m-4">
            <div className="w-full py-2">
              {Object.keys(data).length == 0 && (
                <div className="text-2xl text-gray-800">Cart is Empty!</div>
              )}
              {Object.keys(data).map((key) => {
                return (
                  <div
                    key={key}
                    onLoad={() => {
                      onLoadCalculate(JSON.parse(localStorage.getItem("cart")));
                    }}
                    className="mb-4 flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left"
                  >
                    <Image
                      alt="cart_item"
                      className="flex-shrink-0 rounded-lg object-cover ml-7 object-center sm:mb-0 mb-4"
                      src={`/${data[key].image}`}
                      width={120}
                      height={160}
                      priority={true}
                    />
                    <h2 className="title-font font-medium text-lg pl-8 pr-8 w-[276px] text-gray-900 mr-7">
                      {data[key].title}
                    </h2>
                    <div className="flex-grow ml-2 flex md:flex-row flex-col items-center justify-between pl-8 sm:pl-0">
                      <p className="mb-4">{data[key].size}</p>
                      <div className="text-gray-500 border-[0.5px] flex mb-3">
                        <button
                          onClick={() => {
                            decrease(key);
                          }}
                          className="w-6 bg-blue-50 border-none text-black"
                        >
                          -
                        </button>
                        <p className="w-8 text-center text-blue-950 text-sm mt-[2px]">
                          {data[key].qty}
                        </p>
                        <button
                          onClick={() => {
                            increase(key);
                            onLoadCalculate(
                              JSON.parse(localStorage.getItem("cart"))
                            );
                            console.log(subTotal);
                          }}
                          className="w-6 bg-gray-800 border-gray-800 text-white"
                        >
                          +
                        </button>
                      </div>
                      <p className="mb-4">₹{data[key].price}</p>
                      <ImCross
                        className="mr-8"
                        onClick={() => {
                          deleteObj(key);
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col md:justify-end md:items-end justify-center items-center">
            <div className="text-gray-400 text-sm my-3 tracking-wide font-semibold">
              Total
            </div>
            {Object.keys(data).length == 0 ? (
              <div> </div>
            ) : (
              <div className="text-gray-900 font-bold text-2xl mb-4">
                ₹{subTotal}
              </div>
            )}
            <Link
              href={"/checkout"}
              className="bg-gray-800 hover:bg-white hover:border-2 hover:border-gray-900 hover:text-gray-900 text-lg p-2 text-white border-2 border-gray-900"
            >
              Checkout
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default cart;
