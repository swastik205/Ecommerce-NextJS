import Link from "next/link";
import React from "react";
import axios from "axios";
import Image from "next/image";
import images from "../../images/trijonblack.png";

const index = async () => {
  const data = await getData();
  const prod = Object.values(data);
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-10 mx-auto">
          <div className="flex flex-wrap justify-between">
            {prod.map((item) => {
              return (
                <Link
                  href={`/products/${item.gender}/${item.category}/${item.prodId}/${item.slug}/${item.color}/${item.size[0]}`}
                  key={item._id}
                  className="lg:w-1/4 md:w-1/2 max-w-[250px] border-2 border-white hover:border-2 hover:border-gray-500"
                >
                  <div className="flex justify-center rounded overflow-hidden">
                    <Image
                      alt="ecommerce"
                      className="object-cover object-center mt-7 block"
                      src={`/${item.image}`}
                      width={180}
                      height={240}
                    />
                  </div>
                  <div className="mt-3 mb-5 flex flex-col items-center">
                    {/* <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      iPhone
                    </h3> */}
                    <h2 className="text-gray-900 font-bold tracking-wide text-lg">
                      {item.title}
                    </h2>
                    <p className="mt-1 montserrat-700 text-gray-500 text-sm">
                      ₹{item.price}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

async function getData() {
  try {
    const response = await axios({
      method: "get",
      url: "http://localhost:3000/api/getProducts",
      responseType: "json",
    });
    return response.data["products"];
  } catch (error) {
    console.error(error);
  }
}

export default index;
