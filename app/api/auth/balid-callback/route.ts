import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const state = request.nextUrl.searchParams.get("state");
  const error = request.nextUrl.searchParams.get("error");
  
  // Get the PKCE verifier from the cookie we set in the button
  const verifier = request.cookies.get("balid_verifier")?.value;

  if (error || !code) {
    console.error("Auth error or missing code:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!verifier) {
    console.error("Missing PKCE verifier cookie");
    return NextResponse.redirect(new URL("/?error=missing_verifier", request.url));
  }

  try {
    const tokenRes = await fetch(
      process.env.NEXT_PUBLIC_BALID_TOKEN_URL!,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code,
          client_id: process.env.NEXT_PUBLIC_BALID_CLIENT_ID!,
          client_secret: process.env.BALID_CLIENT_SECRET!,
          redirect_uri: process.env.NEXT_PUBLIC_BALID_CALLBACK_URL!,
          code_verifier: verifier, // PKCE Verifier is required for OAuth 2.1
        }),
      }
    );

    const data = await tokenRes.json();

    if (!tokenRes.ok) {
      console.error("Token exchange failed:", data);
      return NextResponse.redirect(new URL("/", request.url));
    }

    // Decode JWT to get user info
    const decoded = JSON.parse(atob(data.access_token.split(".")[1]));
    
    const response = NextResponse.redirect(new URL("/", request.url));
    
    // Set tokens in cookies
    response.cookies.set("baltimes_token", data.access_token, {
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    response.cookies.set(
      "baltimes_user",
      JSON.stringify({
        userId: decoded.sub,
        email: decoded.email,
        name: decoded.user_metadata?.name || decoded.user_metadata?.full_name || "User",
      }),
      {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      }
    );

    // Clean up the verifier cookie
    response.cookies.delete("balid_verifier");

    return response;
  } catch (error) {
    console.error("Callback catch error:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}