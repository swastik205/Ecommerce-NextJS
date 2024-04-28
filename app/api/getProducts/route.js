import { NextRequest, NextResponse } from "next/server";
import connect from "../../../db";
import Products from "../../../models/availprods";

export const GET = async (request, response) => {
  try {
    await connect();
    const products = await Products.find();
    return NextResponse.json({ products });
  } catch (error) {
    return new NextResponse("Error in Fetching posts " + error, {
      status: 500,
    });
  }
};

// export const POST = async (request) => {
//   try {
//     const body = request.body;
//     console.log(body);
//     return new NextResponse(body, { status: 200 });
//   } catch (e) {
//     return new NextResponse("Error in Fetching posts" + error, { status: 400 });
//   }
// };
