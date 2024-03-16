import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
   
   const path=request.nextUrl.pathname;
    const isPathPublic=path==="/signup"|| path==="/login"
    const accessToken=request.cookies.get("accessToken")?.value||"";
    if(accessToken&&isPathPublic)
    {
        return NextResponse.redirect(new URL("/profile", request.nextUrl));
    }
    if(!accessToken&&!isPathPublic)
    {
         return NextResponse.redirect(new URL("/login",request.nextUrl));
    }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/login","/profile", "/signup"],
};
