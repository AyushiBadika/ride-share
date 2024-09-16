import { useState } from "react";
import HeroSection from "../components/heroSection/HeroSection";
import Intro from "../components/introduction/Intro";
import Search from "../components/search/Search";
import Rides from "../components/rides/rides";

export default function Home() {
  const [rides, setRides] = useState([]);

  return (
    <>
      <HeroSection />
      <div className="relative">
        <Search setRides={setRides} />
        {rides.length > 0 ? <Rides rides={rides} /> : ""}
        <Intro />
      </div>
    </>
  );
}
