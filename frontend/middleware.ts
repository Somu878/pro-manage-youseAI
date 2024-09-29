"use server";
import { NextRequest, NextResponse } from "next/server";
import { GetUser } from "./app/api/userApi";
import { cookies } from "next/headers";

async function middleware(req: NextRequest, res: NextResponse) {
  // if (!cookies().get("token")){
  //     return NextResponse.redirect(new URL('/auth', req.url))
  // }
  try {
    const token = cookies().get("token")?.value;
    const response = await GetUser(token as string);

    if (!response?.user) {
      return NextResponse.redirect(new URL("/on-board", req.url));
    } else {
      return NextResponse.next();
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.redirect(new URL("/on-board", req.url));
  }
}

export default middleware;

export const config = {
  matcher: ["/dashboard"],
  // Exclude the authentication route from the middleware
  ignoreRoutes: ["/on-board"],
};
