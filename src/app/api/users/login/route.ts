// url :: /api/users/login
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    if (!email && !password)
      return NextResponse.json({
        error: "Email or Password is missing",
        status: "400",
      });
    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ error: "User does not exists" });

    //verify password
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid)
      return NextResponse.json({ error: "Invalid Password", status: "400" });
    //token creation
    const accessToken = createAccessToken({ _id: user._id, email });
    const response = NextResponse.json({
      message: "Login successfull",
      status: true,
    });
    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    console.log("error in login route");
    return NextResponse.json({
      error: error.message,
      status: 500,
    });
  }
}
function createAccessToken(payload: any) {
  return jwt.sign(payload, process.env.TOKEN_SECRET!, {
    expiresIn: "1d",
  });
}
