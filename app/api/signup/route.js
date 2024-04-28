import { NextResponse, NextRequest } from "next/server";
import connect from "../../../db";
import Users from "../../../models/users";
import CryptoJS from "crypto-js";
const Verifier = require("email-verifier");

export const POST = async (req, res) => {
  try {
    await connect();
    const body = await req.json();
    const { username, email, password } = body;

    // let emailCheck;

    const verifier = new Verifier("at_R4oca2ushsbyNLsGICL6cn1LMjK9K", {
      checkCatchAll: false,
      checkDisposable: false,
      checkFree: false,
      validateAudit: false,
    });
    await verifier.verify(email, (err, data) => {
      if (err) throw err;
      console.log(data);
    });

    await Users.create({
      username,
      email,
      password: CryptoJS.AES.encrypt(
        password,
        process.env.SECRET_KEY
      ).toString(),
    });
    // console.log(emailCheck);
    return NextResponse.json({ success: true });
  } catch (error) {
    return new NextResponse("Error: " + error, { status: 500 });
  }
};
