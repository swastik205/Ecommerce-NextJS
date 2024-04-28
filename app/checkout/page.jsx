"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SiRazorpay } from "react-icons/si";
import { BsCashStack } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

const checkout = () => {
  const router = useRouter();
  const [subTotal, setSubTotal] = useState();
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    contact: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [payment, setPayment] = useState("");

  const mainProceed = () => {
    if (
      formData.fullName == "" ||
      formData.address == "" ||
      formData.contact == "" ||
      formData.city == "" ||
      formData.state == "" ||
      formData.zipCode == ""
    ) {
      toast.warn("Please Fill up all Details", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    localStorage.setItem("order", JSON.stringify(formData));
    if (payment == "") {
      return;
    } else if (payment == "razorpay") {
      router.push("/upi/razorpay");
    } else if (payment == "cod") {
      router.push("/checkout/payment/confirm/success");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    try {
      if (localStorage.getItem("cart")) {
        onLoadCalculate(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      router.push("/cart");
      // console.error(error);
      // localStorage.clear();
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

  useEffect(() => {
    console.log(payment);
  }, [payment]);

  return (
    <div className="mb-10 mt-[90px]">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="flex justify-center items-center mt-10">
        <p className="text-blue-950 text-4xl font-bold">Checkout</p>
      </div>
      <div className="container mx-auto flex">
        <form className="w-full max-w-lg flex-1">
          <div className="text-md font-semibold mb-2">Buyer's Info</div>
          <hr className="w-full mb-4" />
          <div className="mb-4">
            <label
              className="block text-gray-500 text-sm font-semibold mb-2"
              htmlFor="fullName"
            >
              Full Name
            </label>
            <input
              className="appearance-none border-2 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none "
              id="fullName"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-500 text-sm font-semibold mb-2"
              htmlFor="address"
            >
              Address
            </label>
            <input
              className="appearance-none border-2 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none "
              id="address"
              type="text"
              name="address"
              value={formData.address}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-500 text-sm font-semibold mb-2"
              htmlFor="contact"
            >
              Contact
            </label>
            <input
              className="appearance-none border-2 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none "
              id="contact"
              type="text"
              name="contact"
              value={formData.contact}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-500 text-sm font-semibold mb-2"
              htmlFor="city"
            >
              City
            </label>
            <input
              className="appearance-none border-2 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none "
              id="city"
              type="text"
              name="city"
              value={formData.city}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div className="flex gap-3">
            <div className="mb-4">
              <label
                className="block text-gray-500 text-sm w-40 font-semibold mb-2"
                htmlFor="state"
              >
                State
              </label>
              <input
                className="appearance-none border-2 w-48 py-2 px-3 text-gray-700 leading-tight focus:outline-none "
                id="state"
                type="text"
                name="state"
                value={formData.state}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-500 text-sm font-semibold mb-2"
                htmlFor="zipCode"
              >
                Zip Code
              </label>
              <input
                className="appearance-none border-2 w-40 py-2 px-3 text-gray-700 leading-tight focus:outline-none "
                id="zipCode"
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </div>
          </div>
        </form>
        <div className="flex-1 flex flex-col items-center">
          <p className="text-[32px] mb-7 mt-9 text-indigo-900 italic tracking-wider font-bold">
            Payment Method
          </p>
          <form className="flex flex-col justify-center gap-4">
            <div className="bg-blue-100/80 p-4">
              <input
                type="radio"
                id="razorpay"
                name="payment"
                value="razorpay"
                checked={payment === "razorpay"}
                onChange={(e) => {
                  setPayment(e.target.value);
                }}
                className="accent-blue-900 border-4 border-blue-950 size-4"
              />
              <SiRazorpay className="inline w-8 h-8 m-3 ml-4 mb-2 mt-0 text-indigo-700" />
              <label
                htmlFor="razorpay"
                className="text-2xl tracking-wide text-indigo-700 font-bold p-2"
              >
                RazorPay - UPI
              </label>
            </div>
            <div className="bg-blue-100/80 p-4">
              <input
                type="radio"
                id="cod"
                name="payment"
                value="cod"
                checked={payment === "cod"}
                onChange={(e) => {
                  setPayment(e.target.value);
                }}
                className="accent-blue-900 border-4 border-blue-950 size-4"
              />
              <BsCashStack className="inline w-8 h-8 m-3 ml-4 mb-2 mt-0 text-indigo-700" />
              <label
                htmlFor="cod"
                className="text-2xl tracking-wide text-indigo-700 font-bold p-2"
              >
                Cash On Delivery
              </label>
            </div>
            <div>
              <div className="flex flex-col w-72 mx-auto py-3 bg-blue-50 rounded-xl">
                <div className="flex justify-between">
                  <p className="m-2 ml-4 text-sm font-bold text-gray-600">
                    Subtotal:{" "}
                  </p>
                  <p className="m-2 mr-4 text-sm font-bold text-gray-600">
                    ₹ {subTotal}.00
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="m-2 ml-4 text-sm font-bold text-gray-600">
                    Delivery Charges:{" "}
                  </p>
                  <p className="m-2 mr-4 text-sm font-bold text-gray-600">
                    ₹ 50.00
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="m-2 ml-4 text-xl font-bold text-blue-900">
                    Total:
                  </p>
                  <p className="m-2 mr-4 text-xl font-bold text-blue-900">
                    ₹ {subTotal + 50}.00
                  </p>
                </div>
              </div>
            </div>
          </form>
          <button
            onClick={() => {
              mainProceed();
            }}
            className={`p-3 text-white bg-indigo-950 my-4 w-auto mx-auto rounded ${
              !payment ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            Proceed to Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default checkout;
