import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getTokenData";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";

connect();
export async function GET(request: NextRequest) {
  try {
    const userId=getDataFromToken(request);
    const user=await User.findOne({_id:userId}).select("-password");
    if(!user)return NextResponse.json({error:"User Not found",status:"404"});
   const response= NextResponse.json({
    message:"User found",
    data:user
   })
   return response

  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 500,
    });
  }
}
