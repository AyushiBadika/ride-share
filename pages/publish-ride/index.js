import React, { useState } from "react";
import tw from "tailwind-styled-components";
import { postApi } from "../../utils/api/endpoints";
import toast from "react-hot-toast";
import Loader from "../../components/shared/Loader";
import WithAuth from "../../components/hoc/WithAuth";

const Form = tw.form`
flex flex-col gap-4 items-center mt-28`;

const Heading = tw.h1`
text-3xl font-bold mb-10 text-center`;

const Input = tw.input`
 px-4 py-3 rounded-2xl w-[310px] xs:w-[420px] sm:w-[600px]
 outline-none bg-[#ECEDEC] focus:border-2 focus:border-[#00AFF5] flex 
`;
const Button = tw.button`
bg-[#00AFF5] text-white rounded-2xl min-w-32 px-4 py-2 mt-6 flex items-center justify-center
`;

const Ride = () => {
  const [from, setFrom] = useState("Chittorgarh");
  const [to, setTo] = useState("Jaipur");
  const [totalSeatsAvailable, setTotalSeatsAvailable] = useState(3);
  const [pricePerPassenger, setPricePerPassenger] = useState(1000);
  const [departureDate, setDepartureDate] = useState("");
  const [vehicleDetails, setVehicleDetails] = useState({
    company: "Tata",
    model: "Nano ",
    makeYear: "2009",
  });

  // States
  const [tripDetailsPage, setTripDetailsPage] = useState(true);
  const [vehicleDetailsPage, setVehicleDetailsPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePublish = async (e) => {
    e.preventDefault();

    if (!from || !to || !departureDate || totalSeatsAvailable <= 0 || pricePerPassenger <= 0 || !vehicleDetails.company || !vehicleDetails.model || !vehicleDetails.makeYear) {
      toast.error("Please fill all the required fields!");
      return;
    }

    setIsLoading(true);
    const res = await postApi.ride({ body: { from, to, totalSeatsAvailable, pricePerPassenger, departureDate, vehicleDetails } });
    if (res) {
      toast.success("Ride published successfully!");
      setTripDetailsPage(true);
      setVehicleDetailsPage(false);
    }
    setIsLoading(false);
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
            <Button disabled={isLoading ? true : false} onClick={handlePublish}>
              {isLoading ? <Loader /> : "Publish Ride"}
            </Button>
          </div>
        </>
      )}
    </Form>
  );
};

export default WithAuth(Ride);
