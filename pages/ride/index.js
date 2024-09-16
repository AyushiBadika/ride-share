import React, { useState } from "react";
import tw from "tailwind-styled-components";
import { postApi } from "../../utils/api/endpoints";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

const Form = tw.form`
flex flex-col gap-4 items-center mt-28`;

const Heading = tw.h1`
text-3xl font-bold mb-10`;

const Input = tw.input`
 px-4 py-3  rounded-2xl w-[600px]
 outline-none bg-[#ECEDEC] focus:border-2 focus:border-[#00AFF5] flex 
`;
const Button = tw.button`
bg-[#00AFF5] text-white rounded-2xl w-28 p-2 mt-6 flex items-center justify-center
`;

export default function Ride() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [totalSeatsAvailable, setTotalSeatsAvailable] = useState("");
  const [pricePerPassenger, setPricePerPassenger] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [vehicleDetails, setVehicleDetails] = useState({
    company: "",
    model: "",
    makeYear: "",
  });

  // States
  const [tripDetailsPage, setTripDetailsPage] = useState(true);
  const [vehicleDetailsPage, setVehicleDetailsPage] = useState(false);

  const handlePublish = async (e) => {
    e.preventDefault();
    try {
      const res = await postApi.ride({ body: { from: "jaipur", to: "delhi", totalSeatsAvailable: "1", pricePerPassenger: "100", departureDate } });
      console.log(res);
      if (res) {
        toast.success("Ride published successfully!");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleVehicleDetails = (name, value) => {
    setVehicleDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <Form>
      {tripDetailsPage && (
        <>
          <Heading>Trip Details</Heading>
          <Input type={"text"} placeholder={"From"} value={from} onChange={(e) => setFrom(e.target.value)} />
          <Input type={"text"} placeholder={"To"} value={to} onChange={(e) => setTo(e.target.value)} />
          <Input type={"date"} placeholder={"Departure Date"} value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} />
          <Button
            onClick={() => {
              setVehicleDetailsPage(true);
              setTripDetailsPage(false);
            }}
          >
            Next
          </Button>
        </>
      )}

      {vehicleDetailsPage && (
        <>
          <Heading>Vehicle Details</Heading>
          <Input type={"text"} placeholder={"Vehicle Company"} value={vehicleDetails.company} name="company" onChange={(e) => handleVehicleDetails(e.target.name, e.target.value)} />
          <Input type={"text"} placeholder={"Vehicle Model"} value={vehicleDetails.model} name="model" onChange={(e) => handleVehicleDetails(e.target.name, e.target.value)} />
          <Input type={"text"} placeholder={"Vehicle Make Year"} value={vehicleDetails.makeYear} name="makeYear" onChange={(e) => handleVehicleDetails(e.target.name, e.target.value)} />
          <Input type={"number"} placeholder={"Seats Available"} value={totalSeatsAvailable} onChange={(e) => setTotalSeatsAvailable(e.target.value)} />
          <Input type={"number"} placeholder={"Price Per Seat"} value={pricePerPassenger} onChange={(e) => setPricePerPassenger(e.target.value)} />

          <div className="flex gap-8 items-center">
            <Button
              onClick={() => {
                setVehicleDetailsPage(false);
                setTripDetailsPage(true);
              }}
            >
              Previous
            </Button>
            <Button onClick={handlePublish}>Publish ride</Button>
          </div>
        </>
      )}
    </Form>
  );
}
