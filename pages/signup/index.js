import { useState } from "react";
import tw from "tailwind-styled-components";
import { postApi } from "../../utils/api/endpoints";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Loader from "../../components/shared/Loader";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Heading = tw.h1`
text-3xl font-bold mb-6 text-center`;

const SubHeading = tw.h3`
text-xl font-semibold mb-8 text-center`;

const Form = tw.form`
flex flex-col gap-4 items-center`;

const Input = tw.input`
 px-4 py-3 rounded-2xl w-[300px] xs:w-[420px] sm:w-[600px]
 outline-none  bg-[#ECEDEC]
 focus:border-2 focus:border-[#00AFF5]
`;

const Button = tw.button`
bg-[#00AFF5] text-white rounded-2xl px-4 py-2 mt-4 min-w-[100px] flex justify-center
`;

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [viewPassword, setViewPassword] = useState(false);
  const [otpActive, setOtpActive] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpToken, setOtpToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await postApi.signUp({ body: { name, email, phone, password } });

    if (res) {
      setOtpToken(res.otpToken);
      setOtpActive(true);
    }

    setIsLoading(false);
  };

  const handleOtpVerify = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await postApi.verifyOtp({ body: { otp, otpToken } });

    if (res) {
      toast.success(res);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
    setIsLoading(false);
  };

  return otpActive ? (
    <div className="flex flex-col justify-center items-center w-full h-full mt-28 px-2">
      <Heading>Verify Email</Heading>
      <SubHeading>Enter the OTP sent to {email}!</SubHeading>
      <Form action="">
        <Input type="number" placeholder="6-digit OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />

        <Button disabled={isLoading ? true : false} onClick={handleOtpVerify}>
          {isLoading ? <Loader /> : "Verify Email"}
        </Button>
      </Form>
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center w-full h-full mt-28 px-2">
      <Heading>Sign-Up to get started</Heading>

      <Form action="">
        <Input autoComplete={true} type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input autoComplete={true} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input autoComplete={true} type="number" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <div className="relative">
          <Input type={viewPassword ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {password.length > 0 && (
            <div onClick={() => setViewPassword(!viewPassword)} className="absolute top-[22.5%] right-[10px]">
              {viewPassword ? <VisibilityOffIcon className="fill-[#777]" /> : <VisibilityIcon className="fill-[#777]" />}
            </div>
          )}
        </div>
        <p className="text-[#00AFF5] font-semibold cursor-pointer self-start" onClick={() => router.push("/login")}>
          Already registered ? Login here
        </p>

        <Button disabled={isLoading ? true : false} onClick={handleSignUp}>
          {isLoading ? <Loader /> : "Sign Up"}
        </Button>
      </Form>
    </div>
  );
}
