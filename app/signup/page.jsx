"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import $ from "jquery";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const signup = () => {
  const [pstyle, setPstyle] = useState(
    "outline-none text-sm border border-black px-3 rounded-2xl mt-2 w-52 p-1 bg-white/0 shadow/3xl placeholder:px-1 placeholder: foc mb-2 focus:bg-white/95 focus:shadow-2xl placeholder:tracking-widest"
  );

  const [userVal, setUserVal] = useState("Username");
  const [userEmail, setUserEmail] = useState("Email");
  const [passVal, setPassVal] = useState("Password");

  const [creds, setCreds] = useState({ username: "", email: "", password: "" });

  const onSubmitForm = (e) => {
    e.preventDefault();

    if (creds.username === "" && creds.email === "" && creds.password === "") {
      check();
      return;
    }

    axios
      .post("http://localhost:3000/api/signup", {
        username: creds.username,
        email: creds.email,
        password: creds.password,
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    toast.success("Wow so easy!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      // transition: Bounce,
    });
    setCreds({ username: "", email: "", password: "" });
  };

  const onChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };

  const check = () => {
    if (
      $("username").value === undefined &&
      $("email").value === undefined &&
      $("password").value === undefined
    ) {
      setPstyle(
        "outline-none placeholder:text-xs placeholder:font-extralight border border-black rounded-2xl mt-2 mb-2 w-52 p-1 px-3 bg-white/0 foc placeholder:px-1  focus:border-2 focus:bg-white/95 leading-5 placeholder:text-red-700 focus:shadow-2xl placeholder:tracking-tight"
      );
      setUserVal("Please enter your username");
      setUserEmail("Please enter your email");
      setPassVal("Please enter your password");
    }
  };
  return (
    <div className="flex justify-center items-center py-32 bg-blue-50">
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
        // transition: Bounce
      />
      <div className="bg-white/90 top-44 right-40 grid border-0 rounded-3xl signup-form">
        <div className="ml-5 mr-5 text-center text-blue-800 fon grid-rows-1">
          <p
            className="newFont mt-4 pt-4 mb-2 text-3xl"
            style={{ fontWeight: "600" }}
          >
            Sign up
          </p>
        </div>
        <form action="POST" className="ml-11 text-sm flex flex-col w-64">
          <label className="ml-3 tracking-wide text-blue-950">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={creds.username}
            onChange={onChange}
            placeholder={userVal}
            className={pstyle}
          />
          <label className="ml-3 tracking-wide text-blue-950">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={creds.email}
            onChange={onChange}
            placeholder={userEmail}
            className={pstyle}
          />
          <label className="ml-3 tracking-wide text-blue-950">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={creds.password}
            onChange={onChange}
            placeholder={passVal}
            className={pstyle}
          />
          <input
            type="button"
            value="Submit"
            id="submit"
            onClick={(e) => {
              onSubmitForm(e);
            }}
            name="submit"
            className="ml-7 mt-5 shadow-lg bg-blue-950 text-white w-36 text-center text-lg rounded-3xl p-1 text hover:shadow-xl hover:bg-blue-200 h-9 hover:text-black focus: focus:w-32 focus:ml-9 focus:shadow-3xl"
          />
        </form>
        <div className="flex justify-center p-3">
          <div>
            <p className="inline">Already a User?</p>
            <Link
              href={"/login"}
              className="inline ml-1 hover:underline text-blue-600"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default signup;
