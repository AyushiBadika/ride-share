import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { postApi } from "../utils/api/endpoints";
import "dotenv/config";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const user = localStorage.getItem("user");
    if (isLoggedIn) {
      setIsLoggedIn(isLoggedIn);
    } else {
      setIsLoggedIn(false);
    }
    if (user) {
      setUser(user);
    }
    setLoading(false);
  }, []);

  const logout = async () => {
    const response = await api({ endpoint: "/logout", method: "POST" });
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
    toast.success(response);
    router.push("/login");
  };

  const api = async ({ endpoint, method, body, headers = { "Content-Type": "application/json" } }) => {
    const response = await fetch(`https://rideshare-server-84ng.onrender.com${endpoint}`, {
      method,
      body: JSON.stringify(body),
      headers,
      credentials: "include",
    });

    const result = await response.json();

    if (response.status === 200) {
      return result.data;
    } else if (response.status === 400) {
      toast.error(result.err);
      return null;
    } else if (response.status === 401) {
      logout();
      return null;
    } else {
      toast.error(result.err);
      return null;
    }
  };

  return <AuthContext.Provider value={{ user, setUser, loading, setLoading, isLoggedIn, setIsLoggedIn, logout, api }}>{!loading && children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
