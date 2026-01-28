"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface User {
  userId: string;
  email: string;
  name: string;
}

// Helper to generate PKCE values
async function generatePKCE() {
  const verifier = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const hash = await crypto.subtle.digest("SHA-256", data);
  const challenge = btoa(String.fromCharCode(...new Uint8Array(hash)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  return { verifier, challenge };
}

export default function BalidLoginButton() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("baltimes_user="))
      ?.split("=")[1];

    if (userCookie) {
      try {
        setUser(JSON.parse(decodeURIComponent(userCookie)));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const handleLogin = async () => {
    const clientId = process.env.NEXT_PUBLIC_BALID_CLIENT_ID;
    const redirectUri = encodeURIComponent(
      process.env.NEXT_PUBLIC_BALID_CALLBACK_URL!
    );
    const state = Math.random().toString(36).substring(7);

    // Generate PKCE
    const { verifier, challenge } = await generatePKCE();

    // Store verifier in a cookie so the Server Route can read it later
    // sessionStorage doesn't work for Server Actions/Routes
    document.cookie = `balid_verifier=${verifier}; path=/; max-age=300; SameSite=Lax`;
    sessionStorage.setItem("baltimes_state", state);

    // Points to your BAL ID API Route
    window.location.href =
      `${process.env.NEXT_PUBLIC_BALID_AUTHORIZE_URL}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&state=${state}&code_challenge=${challenge}&code_challenge_method=S256`;
  };

  const handleLogout = () => {
    document.cookie = "baltimes_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "baltimes_user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUser(null);
    window.location.reload();
  };

  if (user && user.name) {
    return (
      <div className="flex items-center gap-3">
        <button
          onClick={handleLogout}
          className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer transition"
        >
          Çıkış
        </button>
        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm cursor-pointer hover:bg-blue-700 transition">
          {user.name.charAt(0).toUpperCase()}
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={handleLogin}
      className="cursor-pointer flex items-center justify-center px-4 py-2 max-sm:text-xs max-sm:px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
    >
      <Image
        src="/buttonLogo.png"
        alt="BALID logo"
        width={100}
        height={100}
        className="mr-3 w-10 h-10 max-sm:w-8 max-sm:h-8"
      />
      BALID ile Giriş Yap
    </button>
  );
}