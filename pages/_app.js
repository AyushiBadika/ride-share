import "../styles/globals.css";
import Navbar from "../components/navbar/Navbar";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../context/AuthContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Toaster />
      <Navbar />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
