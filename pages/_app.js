import "../styles/globals.css";
import Navbar from "../components/navbar/Navbar";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { AuthProvider } from "../context/AuthContext";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn")) {
      if (JSON.parse(localStorage.getItem("isLoggedIn"))) {
        router.push("/");
      } else {
        router.push("/login");
      }
    } else {
      router.push("/login");
    }
  }, []);

  return (
    <AuthProvider>
      <Toaster />
      <Navbar />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
