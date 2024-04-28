import { NextRequest, NextResponse } from "next/server";
import connect from "../../../db";
import Users from "../../../models/users";
import CryptoJS from "crypto-js";
const jwt = require("jsonwebtoken");

export const POST = async (req, res) => {
  try {
    await connect();
    const body = await req.json();
    const { username, password } = body;
    const data = await Users.find({ username });
    const checkPass = data[0].password;
    const usern = data[0].username;
    var bytes = CryptoJS.AES.decrypt(checkPass, process.env.SECRET_KEY);
    var originalPass = bytes.toString(CryptoJS.enc.Utf8);
    if (username === usern && originalPass === password) {
      var token = jwt.sign({ username: usern }, process.env.SECRET_KEY_JWT);
      return NextResponse.json({ success: true, token });
    }
    return NextResponse.json(
      { success: false, message: "password did not matched" },
      { status: 500 }
    );
    return;
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
};
