import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem("cafe_user") || localStorage.getItem("cafe_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const hasToken = Boolean(sessionStorage.getItem("cafe_token") || localStorage.getItem("cafe_token"));

  useEffect(() => {
    if (user) {
      sessionStorage.setItem("cafe_user", JSON.stringify(user));
      localStorage.removeItem("cafe_user");
    } else {
      sessionStorage.removeItem("cafe_user");
      localStorage.removeItem("cafe_user");
    }
  }, [user]);

  const login = async (payload) => {
    setIsLoading(true);
    try {
      const { data } = await api.post("/api/auth/login", payload);
      if (data?.token) {
        sessionStorage.setItem("cafe_token", data.token);
        localStorage.removeItem("cafe_token");
      }
      setUser(data?.user || { name: payload.email, email: payload.email });
      return data;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (payload) => {
    setIsLoading(true);
    try {
      const { data } = await api.post("/api/auth/register", payload);
      if (data?.token) {
        sessionStorage.setItem("cafe_token", data.token);
        localStorage.removeItem("cafe_token");
      }
      setUser(data?.user || { name: payload.name, email: payload.email });
      return data;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("cafe_token");
    sessionStorage.removeItem("cafe_user");
    localStorage.removeItem("cafe_token");
    localStorage.removeItem("cafe_user");
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user) && hasToken,
      isLoading,
      login,
      register,
      logout
    }),
    [user, hasToken, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
