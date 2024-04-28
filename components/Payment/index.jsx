import React from "react";

const index = (props) => {
  const { makePayment } = props;
  return (
    <div>
      <div className="flex flex-col w-80 mx-auto mt-40 mb-80 py-3 bg-blue-50 rounded-xl">
        <div className="flex justify-between">
          <p className="m-2 ml-4 text-sm font-bold text-gray-600">Subtotal: </p>
          <p className="m-2 mr-4 text-sm font-bold text-gray-600">
            ₹ {props.total}.00
          </p>
        </div>
        <div className="flex justify-between">
          <p className="m-2 ml-4 text-sm font-bold text-gray-600">
            Delivery Charges:
          </p>
          <p className="m-2 mr-4 text-sm font-bold text-gray-600">₹ 50.00</p>
        </div>
        <div className="flex justify-between">
          <p className="m-2 ml-4 text-xl font-bold text-blue-900">Total:</p>
          <p className="m-2 mr-4 text-xl font-bold text-blue-900">
            ₹ {props.total}.00
          </p>
        </div>
        <button
          onClick={makePayment}
          className="my-5 bg-blue-950 border-2 border-blue-950 hover:bg-blue-50 hover:text-blue-900 font-semibold active:bg-blue-200 rounded-lg text-white mx-auto w-auto p-2"
        >
          Proceed to Pay ₹{props.total}
        </button>
      </div>
    </div>
  );
};

export default index;
