"use client";
import React from "react";
import Payment from "../../../components/Payment";
import axios from "axios";
import { useRouter } from "next/navigation";

const page = async () => {
  const router = useRouter();

  const makePayment = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/razorpay");
      const key = process.env.RAZORPAY_KEY_ID;
      const order = response.data.order;
      console.log(order.id);
      const options = {
        key: key,
        name: "trijoncreations",
        currency: order.currency,
        amount: order.amount,
        order_id: order.id,
        description: "Understanding RazorPay Integration",
        handler: async function (response) {
          // if (response.length==0) return <Loading/>;
          console.log(response);
          const data = await fetch("http://localhost:3000/api/paymentverify", {
            method: "POST",
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
          const res = await data.json();

          console.log("response verify==", res);

          if (res?.message == "success") {
            console.log("redirected.......");
            router.push(
              "/checkout/payment/confirm/" + response.razorpay_payment_id
            );
          }
        },
        prefill: {
          name: "trijoncreations",
          email: "valarieheritage2.05@gmail.com",
          contact: "9432865289",
        },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

      paymentObject.on("payment.failed", function (response) {
        alert("Payment failed. Please try again. Contact support for help");
      });
    } catch (error) {
      console.error(error);
    }
  };
  const total = 1;
  return (
    <div>
      <Payment total={total} makePayment={makePayment} />
    </div>
  );
};

export default page;
