import { NextResponse } from "next/server";

export function middleware(request) {
  // Cookie se token nikalien
  const token = request.cookies.get("token")?.value;

  const isAdminPage = request.nextUrl.pathname.startsWith("/admin");

  // Agar admin page hai aur token nahi hai, toh login par bhej do
  if (isAdminPage && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

// Ye middleware sirf in pages par chalega
export const config = {
  matcher: ["/admin/:path*"],
};
