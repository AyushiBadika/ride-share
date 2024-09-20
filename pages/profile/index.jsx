import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import EditNoteIcon from "@mui/icons-material/EditNote";
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect, useState } from "react";
import { postApi } from "../../utils/api/endpoints.js";
import { useAuth } from "../../context/AuthContext.js";

export default function index() {
  const [selectedOption, setSelectedOption] = useState("Edit Profile");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const { api } = useAuth();

  const options = [
    { label: "Profile", color: "green", icon: <PermIdentityIcon />, style: { color: "green", fontSize: "32px" } },
    { label: "Edit Profile", icon: <EditNoteIcon />, style: { color: "purple", fontSize: "32px" } },
  ];

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    setIsLoading(true);
    const response = await api({ endpoint: "/get-profile", method: "POST" });
    if (response) {
      setUser(response);
    }
    setIsLoading(false);
  };

  const handleOptionChange = (index) => {
    setSelectedOption(options[index].label);
  };

  return (
    <div className="mt-[68px]">
      <div className="flex  px-4 lg:px-12 border-b ">
        {options.map((option, index) => {
          return (
            <div className={`flex gap-2 items-center cursor-pointer py-8 px-6 ${selectedOption === option.label ? "border-b-4 border-[#01AFF4]" : ""}`} onClick={() => handleOptionChange(index)} key={index}>
              {React.cloneElement(option.icon, { style: option.style })}
              <div className="text-md font-semibold text-gray-600">{option.label}</div>
            </div>
          );
        })}
      </div>
      <div>
        {selectedOption === "Profile" && (
          <div className="flex flex-col lg:flex-row px-20 xl:px-32 py-16 gap-12">
            <div className="lg:w-[32%] flex flex-col items-center md:px-40 lg:px-0">
              <div className="w-full flex flex-col justify-center items-center shadow-md py-8 lg:px-10 px-5 rounded">
                <img src="/defaultDP.png" className="w-52 h-52 rounded-full mb-5" />
                <p className="text-gray-800 font-bold text-xl font-serif">Ayushi Badika</p>
                <p className="text-gray-500 font-semibold">ayushibadika@gmail.com</p>
                <p className="text-gray-700 font-bold">India</p>
              </div>
            </div>
            <div className="grow flex flex-col justify-center ">
              {/* name, email, email verification,phone,rating   */}
              <div className="flex gap-16 text-gray-500 font-semibold bg-gray-200 py-6 pl-4 rounded">
                <div className="w-32 ">Name</div> :<div className="font-bold">Ayushi badika</div>
              </div>
              <div className="flex gap-16 text-gray-500 font-semibold py-6 pl-4">
                <div className="w-32 ">Email</div> :<div className="font-bold">ayushibadika@gmail.comm</div>
              </div>
              <div className="flex gap-16 text-gray-500 font-semibold bg-gray-200 py-6 pl-4 rounded">
                <div className="w-32 ">Email verification</div> :
                <div className="font-bold text-orange-600">
                  {/* if pending color green else orange */}
                  Pending
                </div>
              </div>
              <div className="flex gap-16 text-gray-500 font-semibold py-6 pl-4">
                <div className="w-32 ">Contact</div> :<div className="font-bold">1234567890</div>
              </div>
              <div className="flex gap-16 text-gray-500 font-semibold bg-gray-200 py-6 pl-4 rounded">
                <div className="w-32 ">Rating</div> :<div className="font-bold">5</div>
              </div>
            </div>
          </div>
        )}
        {selectedOption === "Edit Profile" && (
          <div className="flex flex-col items-center px-10 xs:px-20 xl:px-80 py-16 md:gap-12 gap-6">
            <div className=" relative w-40 h-40 mb-5">
              <div className="border-[#01AFF4] border-2 rounded-full p-1">
                <img src="/defaultDP.png" className="w-full h-full rounded-full" />
              </div>
              <EditIcon className="absolute bottom-2 right-4 bg-[#01AFF4] text-white rounded-full p-2.5 " style={{ fontSize: "32px" }} />
            </div>
            <div className="grow flex flex-col justify-center w-full">
              {/* name, email, email verification,phone,rating   */}

              <form action="" className="w-full  sm:px-12 lg:px-32 flex flex-col gap-8">
                <div className="flex md:flex-row flex-col w-full gap-8 justify-between">
                  <div className="flex flex-col gap-4 md:w-1/2 w-full">
                    <label htmlFor="fname" className="font-bold text-gray-600 text-xl">
                      Firstname
                    </label>
                    <input type="text" name="fname" id="fname" value={"Ayushi"} className="border border-[#01AFF4] rounded-sm px-5 py-2 grow" />
                  </div>
                  <div className="flex flex-col gap-4 md:w-1/2 w-full">
                    <label htmlFor="lname" className="font-bold text-gray-600 text-xl">
                      Lastname
                    </label>
                    <input type="text" name="lname" id="lname" value={"Badika"} className="border border-[#01AFF4] rounded-sm px-5 py-2" />
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <label htmlFor="email" className="font-bold text-gray-600 text-xl">
                    Email
                  </label>
                  <input type="text" name="email" id="email" value={"ayushibadika@gmail.com"} className="border border-[#01AFF4] rounded-sm px-5 py-2" />
                </div>
                <div className="flex flex-col gap-4">
                  <label htmlFor="phone" className="font-bold text-gray-600 text-xl">
                    Contact
                  </label>
                  <input type="text" name="phone" id="phone" value={"9876543210"} className="border border-[#01AFF4] rounded-sm px-5 py-2" />
                </div>

                <div className="flex flex-col gap-4">
                  <label htmlFor="password" className="font-bold text-gray-600 text-xl">
                    Password
                  </label>
                  <input type="password" name="password" id="password" value={"Badika"} className="border border-[#01AFF4] rounded-sm px-5 py-2" />
                </div>

                <button className="bg-[#01AFF4] text-white py-2 rounded-sm mt-4">Save</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
