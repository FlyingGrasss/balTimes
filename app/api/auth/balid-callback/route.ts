// app/api/auth/balid-callback/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const error = request.nextUrl.searchParams.get("error");

  if (error || !code || !state) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const tokenRes = await fetch(
      process.env.NEXT_PUBLIC_BALID_TOKEN_URL!,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          grant_type: "authorization_code",
          code,
          client_id: process.env.NEXT_PUBLIC_BALID_CLIENT_ID,
          client_secret: process.env.BALID_CLIENT_SECRET,
          redirect_uri:
            process.env.NEXT_PUBLIC_BALID_CALLBACK_URL,
        }),
      }
    );

    const data = await tokenRes.json();

    if (!tokenRes.ok) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    const decoded = JSON.parse(
      atob(data.access_token.split(".")[1])
    );

    const response = NextResponse.redirect(
      new URL("/", request.url)
    );
    response.cookies.set("baltimes_token", data.access_token, {
      maxAge: 60 * 60 * 24 * 7,
    });
    response.cookies.set(
      "baltimes_user",
      JSON.stringify({
        userId: decoded.userId,
        email: decoded.email,
        name: decoded.name || "User",
      }),
      {
        maxAge: 60 * 60 * 24 * 7,
      }
    );

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}