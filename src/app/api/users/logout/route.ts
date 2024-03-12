import { NextResponse } from "next/server";
export async function GET() {
  try {
    const response = NextResponse.json({
      message: "Logout successfully",
      success: true,
    });
    response.cookies.set("accessToken","",{httpOnly:true});
    return response;
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: "500",
    });
  }
}
