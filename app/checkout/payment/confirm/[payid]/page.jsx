"use client";
import React from "react";
import Success from "../../../../../components/Success";

const page = ({ params }) => {
  return (
    <div>
      <Success payid={params.payid} />
    </div>
  );
};

export default page;
