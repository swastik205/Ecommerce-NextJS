import { NextResponse } from "next/server";
import Products from "../../../models/availprods";
import connect from "../../../db";

export const POST = async (req, res) => {
  const body = await req.json();
  const data = Object.values(body);
  let infos = await getUserById(data[0]);
  infos = Object.values(infos);

  console.log(infos);

  return NextResponse.json({ infos });
};

const getColors = async (slug) => {
  let colors = [];
  let idss = [];

  try {
    const response = await Products.find({ slug });
    const data = Object.values(response);
    for (let i = 0; i < data.length; i++) {
      const ele = data[i];
      colors.push(ele.color);
      idss.push(ele.prodId);
    }
    return [colors, idss];
  } catch (e) {
    console.log("error:" + e);
  }
};

const getUserById = async (arr) => {
  const slug = arr[3];
  const color = arr[4];
  try {
    await connect();
    const res = await Products.find({ slug, color });
    const data = Object.values(res);
    console.log(data[0].slug);
    const colors = await getColors(data[0].slug);
    console.log(colors);
    return [data[0], colors];
  } catch (e) {
    console.log("error:" + e);
  }
};
