import React from "react";
import StarIcon from "@mui/icons-material/Star";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Rides({ rides }) {
  return (
    <div className="mt-[36vh] mb-10 md:mt-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 px-8 md:px-16 lg:px-20 pt-48 md:pt-16 bg-white">
      {rides?.length > 0 &&
        rides.map((ride) => {
          return (
            <div className="ride-card bg-white rounded-lg flex flex-col">
              <div className="flex justify-between pl-4 pr-6 py-6">
                <div className="flex gap-2">
                  <div className="flex items-center justify-center gap-2">
                    <div className="flex flex-col gap-1">
                      <div className="font-semibold text-[#222]">06:30</div>
                      <div className="font-semibold text-[10px] text-[#222]">0h20</div>
                      <div className="font-semibold text-[#222]">02:40</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-lg border-[#01AFF4] border-[3px]"></div>
                      <div className="w-1 h-[2.375rem] bg-[#01AFF4] -my-[1px]"></div>
                      <div className="w-3 h-3 rounded-lg border-[#01AFF4] border-[3px]"></div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <div className="flex flex-col gap-6 text-[#333] font-semibold">
                      <div>{ride.from}</div>
                      <div>{ride.to}</div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="font-semibold text-xl text-[#222]">₹ {ride.pricePerPassenger}</div>
                  <span className="text-[10px] font-semibold absolute top-[3px] left-[101.5%]">.00</span>
                </div>
              </div>
              <div className="flex justify-start items-center gap-[0.375rem] px-4 py-[0.5rem] border-t-2">
                <DirectionsCarIcon sx={{ fontSize: "1.25rem", fill: "#777" }} />
                <AccountCircleIcon sx={{ fontSize: "2.25rem", fill: "#888" }} />
                <div className="font-semibold text-[#444]">{ride.userDetails.name}</div>
                <div className="flex justify-end items-center gap-1 grow">
                  <StarIcon sx={{ fontSize: "1.5rem", fill: "#fd0" }} />
                  <p className="text-lg">{ride.userDetails.rating}</p>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
