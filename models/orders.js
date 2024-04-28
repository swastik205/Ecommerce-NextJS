import mongoose from "mongoose";
const { Schema } = mongoose;

const OrderSchema = new Schema({
  userId: { type: String, required: true },
  name_address: { type: Object, required: true },
  products: { type: Object, required: true },
  total: { type: Number, required: true },
  status: { type: String, default: "Pending", required: true },
  payment_id: { type: String, default: "cod", required: true },
  date: { type: Date, default: Date.now },
});

mongoose.models = {};
export default mongoose.model("Order", OrderSchema);
