import { useState } from "react";
import tw from "tailwind-styled-components";
import { postApi } from "../../utils/api/endpoints";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const Heading = tw.h1`
text-3xl font-bold mb-10`;

const Form = tw.form`
flex flex-col gap-4 items-center`;

const Input = tw.input`
 px-4 py-3  rounded-2xl w-[600px]
 outline-none  bg-[#ECEDEC]

 focus:border-2 focus:border-[#00AFF5]
`;

const Button = tw.button`
bg-[#00AFF5] text-white rounded-2xl w-20 p-2 mt-8
`;

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();

    const res = await postApi.signUp({ body: { name, email, phone, password } });

    if (res) {
      toast.success(res);

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center w-full h-full mt-28">
      <Heading>What's your email and password?</Heading>

      <Form action="">
        <Input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="number" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={handleSignUp}>Sign up</Button>
      </Form>
    </div>
  );
}
