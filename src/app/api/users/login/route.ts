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
    if (!email)
      return NextResponse.json({
        error: "Email required",
        status: "400",
      });
    if (!password) {
      return NextResponse.json({
        error: "Password required",
        status: "400",
      });
    }
    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ error: "User does not exists" });

    //verify password
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid)
      return NextResponse.json({ error: "Invalid Password", status: "400" });
    //token creation
    const accessToken = createAccessToken({ _id: user._id });
    const response = NextResponse.json({
      message: "User LoggedIn",
      status: true,
    });
    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
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
