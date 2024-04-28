import { NextRequest, NextResponse } from "next/server";
import connect from "../../../db";
import Products from "../../../models/availprods";

export const POST = async (request) => {
  try {
    await connect();
    const body = await request.json();
    const {
      title,
      prodId,
      slug,
      desc,
      image,
      category,
      gender,
      size,
      color,
      price,
      dprice,
      availableQty,
    } = body;
    // console.log(body);
    await Products.create({
      title,
      prodId,
      slug,
      desc,
      image,
      category,
      gender,
      size,
      color,
      price,
      dprice,
      availableQty,
    });

    return new NextResponse(body, { status: 200 });
  } catch (e) {
    return new NextResponse("Error in Fetching posts" + e, { status: 400 });
  }
};
