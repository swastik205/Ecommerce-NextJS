import { NextResponse } from "next/server";
import orders from "../../../models/orders";
const jwt = require("jsonwebtoken");

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { token, name_address, products, total, status, payment_id } = body;
    const user = jwt.verify(token, process.env.SECRET_KEY_JWT);
    await orders.create({
      userId: user.username,
      name_address,
      products,
      total,
      status,
      payment_id,
    });
    return NextResponse.json(
      {
        username: user.username,
        name_address,
        products,
        total,
        status,
        payment_id,
      },
      { status: 200 }
    );
  } catch (e) {
    console.error(e);
  }
};
