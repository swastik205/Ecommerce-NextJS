"use client";
import { useRouter } from "next/navigation";
import Loading from "../../../components/Loading";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import images from "../../../public/images.json";

export default function Page({ params }) {
  const [product, setProduct] = useState({ size: "S" });
  const [color, setColor] = useState([]);
  const [idss, setIdss] = useState([]);
  const [size, setSize] = useState("S");
  const [imageNo, setImageNo] = useState(0);
  const [cartButton, setCartButton] = useState("Add to Cart");
  const router = useRouter();

  useEffect(() => {
    axios({
      method: "post",
      url: "http://localhost:3000/api/try",
      headers: {},
      data: {
        dat: params.pid,
      },
    })
      .then((res) => {
        setProduct(res.data.infos[0]);
        setColor(res.data.infos[1][0]);
        setIdss(res.data.infos[1][1]);
        if (params.pid[5] == null) {
          setSize(res.data.infos[0].size[0]);
        } else {
          setSize(params.pid[5]); //res.data.infos[0].size[0]
        }
      })
      .catch((e) => {
        console.error(e);
      });

    check();
  }, []);

  const check = () => {
    const cartData = JSON.parse(localStorage.getItem("cart"));
    if (cartData === null) {
      setCartButton("Add to Cart");
    } else {
      for (let i = 0; i < cartData.length; i++) {
        if (
          cartData[i].prodId == params.pid[2] &&
          cartData[i].size == params.pid[5] &&
          cartData[i].color == params.pid[4]
        ) {
          setCartButton("Go to Cart");
          break;
        }
      }
    }
  };

  const routeMeTo = () => {
    if (params.pid[5] == null) {
      alert("Please Choose Size");
      return;
    }
    if (cartButton === "Go to Cart") {
      router.push("/cart");
      return;
    }

    const infos = {
      prodId: product.prodId,
      title: product.title,
      image: product.image,
      color: product.color,
      qty: 1,
      size: size,
      price: product.dprice,
      availQty: product.availableQty,
    };

    const local = localStorage.getItem("cart");
    if (local === null) {
      const cart = [];
      cart.push(infos);
      localStorage.setItem("cart", JSON.stringify(cart));
      setCartButton("Go to Cart");
      return;
    }
    const cartData = JSON.parse(local);
    cartData.push(infos);
    localStorage.setItem("cart", JSON.stringify(cartData));
    setCartButton("Go to Cart");
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    setSize(event.target.value);
  };

  if (Object.keys(product).length === 0) {
    setSize(product.size[0]);
    return (
      <>
        <Loading />
      </>
    );
  }
  if (Object.keys(color).length === 0) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <>
      <section
        onLoad={check}
        className="text-gray-600 body-font overflow-hidden mt-10"
      >
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto md:mx-10 flex flex-wrap justify-between">
            <div className="lg:w-1/2 lg:h-auto flex flex-row gap-4 flex-1">
              <div className="flex flex-col gap-2">
                {images[params.pid[2]].image.map((ele, key) => {
                  return (
                    <Image
                      key={key}
                      alt="ecommerce"
                      className="object-cover border-2 border-gray-100 hover:border-2 hover:border-gray-500 inline object-center rounded cursor-pointer"
                      width={90}
                      height={133}
                      src={`/${ele}`}
                      priority={true}
                      onClick={() => {
                        setImageNo(key);
                      }}
                    />
                  );
                })}
              </div>
              <figure>
                <Image
                  alt="ecommerce"
                  className="object-cover object-center rounded"
                  width={330}
                  height={440}
                  src={`/${images[params.pid[2]].image[imageNo]}`}
                  priority={true}
                />
              </figure>
            </div>
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm font-semibold text-gray-500 tracking-widest">
                TRIJON
              </h2>
              <h1 className="text-gray-800 text-4xl mt-2 mb-1 montserrat-500">
                {product.title}
              </h1>
              <div className="flex mb-4"></div>
              <div className="leading-relaxed text-[15px] font-semibold mb-2">
                {product.desc.split(";").map((e, k) => {
                  return (
                    <div key={k}>
                      <p>{e}</p>
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-col mt-6 items-start gap-3 pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex items-center">
                  <span className="mr-3 font-bold text-gray-500 text-sm">
                    Color
                  </span>
                  {color.map((ele, key) => {
                    return (
                      <Link
                        href={`/products/${product.gender}/${product.category}/${idss[key]}/${product.slug}/${color[key]}`}
                        key={key}
                        className={
                          `border-2 border-gray-300 ml-1 hover:border-gray-700 rounded-full w-7 h-7 focus:outline-none ` +
                          `${color[key]}`
                        }
                      ></Link>
                    );
                  })}
                </div>
                <div className="flex items-center">
                  <span className="mr-6 font-bold text-gray-500 text-sm">
                    Size
                  </span>
                  <div className="relative flex gap-2 justify-between">
                    {product.size.map((ite, key) => {
                      return (
                        <Link
                          href={`/products/${product.gender}/${product.category}/${product.prodId}/${product.slug}/${product.color}/${product.size[key]}`}
                          onClick={handleChange}
                          key={key}
                          className="font-bold w-12 h-12 rounded-full flex justify-center items-center text-sm hover:text-white hover:bg-gray-800 border-2 border-gray-800"
                        >
                          {product.size[key]}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col items-start -mt-3">
                  <p className="text-green-500 font-bold text-xs">
                    inclusive of all taxes
                  </p>
                  <div className="flex gap-2 items-end">
                    <span className="font-medium text-2xl text-gray-700 montserrat-700">
                      ₹{product.dprice}
                    </span>
                    <span className="line-through font-medium text-base text-gray-700 montserrat-500 mb-0.5">
                      ₹{product.price}
                    </span>
                  </div>
                  <span className="ml-1 font-medium text-base text-red-400 montserrat-500 mb-0.5">
                    (₹{product.price - product.dprice} OFF)
                    {/* {Math.round(
                      ((product.price - product.dprice) / product.price) * 100
                    )}
                    % */}
                  </span>
                </div>
                <div className="ml-auto">
                  <button
                    onClick={routeMeTo}
                    className="flex justify-center text-white hover:text-gray-900 hover:bg-white bg-gray-800 border-2 font-semibold border-gray-800 py-2 px-6 focus:outline-none rounded"
                  >
                    {cartButton}
                  </button>
                </div>
                {/* <AddToCart
                  prodId={product.prodId}
                  title={product.title}
                  image={product.image}
                  color={product.color}
                  price={product.dprice}
                  size={size}
                /> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
