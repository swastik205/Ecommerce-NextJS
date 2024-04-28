import mongoose from "mongoose";
const { Schema } = mongoose;

const paymentSchema = new Schema({
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },
});

// export const Payment = mongoose.model("Payment", paymentSchema);
mongoose.models = {};
const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
