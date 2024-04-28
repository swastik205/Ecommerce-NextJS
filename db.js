import mongoose from "mongoose";

const connect = async () => {
  try {
    if (mongoose.connection.readyState) {
      console.log("Already Connected");
      return;
    }
    // else {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Mongodb is connected successfully");
    // }
  } catch (e) {
    throw new Error("Error in connecting connecting to DB");
  }
};

export default connect;
