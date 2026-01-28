import { useEffect, useState } from "react";

interface User {
  userId: string;
  email: string;
  name: string;
}

export function useBalidUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("baltimes_user="))
      ?.split("=")[1];

    if (userCookie) {
      try {
        const userData = JSON.parse(decodeURIComponent(userCookie));
        setUser({
          userId: userData.userId,
          email: userData.email,
          name: userData.name,
        });
      } catch (error) {
        console.error("Failed to parse baltimes_user cookie:", error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  return { user, loading };
}