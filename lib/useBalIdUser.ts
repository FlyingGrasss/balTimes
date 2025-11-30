// lib/useBalidUser.ts

import { useEffect, useState } from "react";

interface User {
  userId: string;
  email: string;
}

export function useBalidUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("baltimes_token="))
      ?.split("=")[1];

    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        setUser({
          userId: decoded.userId,
          email: decoded.email,
        });
        // Store in localStorage for client components
        localStorage.setItem(
          "baltimes_user",
          JSON.stringify(decoded)
        );
      } catch {
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  return { user, loading };
}