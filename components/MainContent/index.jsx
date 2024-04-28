import React from "react";
import { FaArrowRight } from "react-icons/fa6";
import Products from "../Products";
import Categ from "../Categories";

const Main = () => {
  return (
    <div>
      <section className="text-gray-400 body-font overflow-hidden bg-blue-50/60 md:mt-[65px]">
        <div className="container mx-auto">
          <div className="lg:w-4/5 flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-lg font-medium my-6 text-gray-700 tracking-widest">
                TRIJON CREATIONS
              </h2>
              <h1 className="text-gray-900 text-6xl font-[playfair] font-medium tracking-wider mb-4">
                Summer Sale
              </h1>
              <h2 className="text-gray-800 text-5xl font-bold mb-4">50% Off</h2>
              <p className="text-gray-600 mt-7">
                The most authentic apparrels are here, dive deep into the new
                collections of menswear with fresh and trendy outfits and in the
                new world of fashion which would take your appearance to a new
                level
              </p>
              <button className="bg-gray-800 h-10 w-36 text-white border-2 border-gray-800 hover:bg-white hover:text-black flex flex-row items-center justify-center mt-5">
                <div className="mr-4">Shop Now</div>
                <FaArrowRight />
              </button>
            </div>
            {/* <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-40 object-cover object-center rounded"
              src="https://dummyimage.com/300x300"
            /> */}
          </div>
        </div>
      </section>
      <div className="flex justify-center items-center md:justify-normal md:ml-20 md:mt-10">
        <div className="text-4xl text-gray-700 font-bold mb-4">Categories</div>
      </div>
      <Categ />

      <div className="flex justify-center items-center md:justify-normal md:ml-20 md:mt-10">
        <div className="text-4xl text-gray-700 font-bold ">Products</div>
      </div>
      <Products />
    </div>
  );
};

export default Main;
