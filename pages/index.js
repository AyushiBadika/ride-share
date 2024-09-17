import { useState } from "react";
import HeroSection from "../components/heroSection/HeroSection";
import Intro from "../components/introduction/Intro";
import Search from "../components/search/Search";
import Rides from "../components/rides/Rides";

export default function Home() {
  const [rides, setRides] = useState([]);

  return (
    <>
      <div className="relative">
        <HeroSection />
        <Search setRides={setRides} />
      </div>
      {rides.length > 0 ? <Rides rides={rides} /> : <Intro />}
    </>
  );
}
