// url :: /api/users/signup
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    //check if user already exists
    const user = await User.findOne({$or:[{email},{username}]});
    if (user) {
      return NextResponse.json({ error: "UserName or email already exists" });
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    await User.create({
      username,
      email,
      password: hashedPassword,
    });
    return NextResponse.json({
      message: "User Registered",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 500,
    });
  }
}
