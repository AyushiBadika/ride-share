// components/hoc/WithAuth.js
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";

const WithAuth = (WrappedComponent) => {
  return (props) => {
    const { isLoggedIn, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && Boolean(isLoggedIn) === false) {
        router.push("/login");
      }
    }, [loading, isLoggedIn, router]);

    return Boolean(isLoggedIn) === true ? <WrappedComponent {...props} /> : <div>Unauthorized</div>; // Render the wrapped component if logged in, otherwise display an unauthorized message
  };
};

export default WithAuth;
