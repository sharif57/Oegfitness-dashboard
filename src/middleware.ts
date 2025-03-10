

import { getCurrentUser } from "@/service/authService";
import { NextResponse } from "next/server";

export async function middleware(request: Request) {
  // Fetch current user (authentication token)
  const token = await getCurrentUser();

  // If there's no token, redirect to login page
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If user is authenticated, proceed with the request
  return NextResponse.next();
}

// Define which paths the middleware applies to
export const config = {

  matcher: [
    '/',
    "/earnings",
    "/exersice",
    "/workout",
    "/nutrition",
    "/appointment-plan",
    "/appointment",
    "/users",
    "/appointment",
    "/subscription",
    "/profile",
    "/settings",
    '/settings/:page'
  ],
};
