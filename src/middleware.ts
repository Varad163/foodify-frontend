import { NextResponse } from "next/server";

import type { NextRequest }
from "next/server";

export function middleware(
  request: NextRequest
) {

  const token =
    request.cookies.get("token");

  const role =
    request.cookies.get("role");

  const pathname =
    request.nextUrl.pathname;

  // =========================
  // NOT LOGGED IN
  // =========================

  if (
    !token &&
    (
      pathname.startsWith(
        "/admin-dashboard"
      ) ||

      pathname.startsWith(
        "/restaurant-dashboard"
      ) ||

      pathname.startsWith(
        "/delivery-dashboard"
      )
    )
  ) {

    return NextResponse.redirect(
      new URL(
        "/login",
        request.url
      )
    );
  }

  // =========================
  // ADMIN ROUTES
  // =========================

  if (
    pathname.startsWith(
      "/admin-dashboard"
    ) &&
    role?.value !== "ADMIN"
  ) {

    return NextResponse.redirect(
      new URL("/", request.url)
    );
  }

  // =========================
  // RESTAURANT ROUTES
  // =========================

  if (
    pathname.startsWith(
      "/restaurant-dashboard"
    ) &&
    role?.value !==
      "RESTAURANT_OWNER"
  ) {

    return NextResponse.redirect(
      new URL("/", request.url)
    );
  }

  // =========================
  // DELIVERY ROUTES
  // =========================

  if (
    pathname.startsWith(
      "/delivery-dashboard"
    ) &&
    role?.value !==
      "DELIVERY_PARTNER"
  ) {

    return NextResponse.redirect(
      new URL("/", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {

  matcher: [

    "/admin-dashboard/:path*",

    "/restaurant-dashboard/:path*",

    "/delivery-dashboard/:path*",
  ],
};