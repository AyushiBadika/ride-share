import tw from "tailwind-styled-components";
import { postApi } from "../../utils/api/endpoints";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/router";
import Loader from "../../components/shared/Loader";

const Heading = tw.h1`
text-3xl font-bold mb-10`;

const Form = tw.form`
flex flex-col gap-4 items-center`;

const Input = tw.input`
 px-4 py-3  rounded-2xl w-[600px]
 outline-none  bg-[#ECEDEC]

 focus:border-2 focus:border-[#00AFF5] flex 
`;

const Button = tw.button`
bg-[#00AFF5] text-white rounded-2xl w-20 p-2 flex justify-center min-w-[100px]
`;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await postApi.login({ body: { email, password } });

    if (res) {
      toast.success("User logged in successfully!");
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("user", JSON.stringify(res));
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
    setIsLoading(false);
  };
  return (
    <div className="flex flex-col justify-center items-center w-full h-full mt-28">
      <Heading>What's your email and password?</Heading>

      <Form action="" onSubmit={handleLogin}>
        <Input autoComplete={true} type={"email"} placeholder={"Email"} value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type={"password"} placeholder={"Password"} value={password} onChange={(e) => setPassword(e.target.value)} />
        <div className="flex flex-col gap-2 self-start">
          <p className="text-[#00AFF5] font-semibold cursor-pointer">Forgot Password?</p>
          <p className="text-[#00AFF5] font-semibold cursor-pointer" onClick={() => router.push("/signup/verify-otp")}>
            Email not verified? Verify here
          </p>
          <p className="text-[#00AFF5] font-semibold cursor-pointer" onClick={() => router.push("/signup")}>
            New to Rideshare? Register here
          </p>
        </div>

        <Button disabled={isLoading ? true : false}>{isLoading ? <Loader /> : "Login"}</Button>
      </Form>
    </div>
  );
}

export default Login;
