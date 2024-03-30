import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("accessToken")?.value||"";
    const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!);
    return decodedToken._id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
