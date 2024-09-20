import { useState } from "react";
import styles from "./Search.module.css";
import { getApi } from "../../utils/api/endpoints";
import { searchCity } from "../../utils/cities";
import toast from "react-hot-toast";
import Loader from "../shared/Loader";

export default function Search({ setRides }) {
  const [from, setFrom] = useState("Chittorgarh");
  const [to, setTo] = useState("Jaipur");
  const [date, setDate] = useState("2024-09-10T00:00:00.000+00:00");
  const [fromCitiesList, setFromCitiesList] = useState([]);
  const [toCitiesList, setToCitiesList] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  const handleSearchRide = async (e) => {
    e.preventDefault();
    try {
      setIsFetching(true);

      if (!from || !to || !date) {
        toast("All fields are mandatory!");
        return;
      }

      const res = await getApi.searchRide({ from, to, date });
      if (res) {
        if (res.length === 0) {
          toast.error("No Ride Found");
          return;
        }
        setRides(res);
        toast.success("Rides fetched successfully!");
      }
    } catch (error) {
      toast.error("No Ride Found");
    } finally {
      setIsFetching(false);
    }
  };

  function handleCitySearch(query, isFrom) {
    if (query.length > 3) {
      isFrom ? setFromCitiesList(searchCity(query)) : setToCitiesList(searchCity(query));
    } else {
      isFrom ? setFromCitiesList([]) : setToCitiesList([]);
    }
  }

  return (
    <div className={styles.formDiv}>
      <form className={styles.form} onSubmit={handleSearchRide}>
        <div className="p-3 flex items-center border-b md:border-b-0  md:w-1/4 md:border-r">
          <input
            type="text"
            value={from}
            onChange={(e) => {
              setFrom(e.target.value);
              handleCitySearch(e.target.value, true);
            }}
            placeholder="Leaving from"
            className={styles.input}
          />
          {fromCitiesList.length > 0 ? (
            <ul className="absolute top-full  left-[0.75rem] border w-1/4 bg-white rounded-b-xl">
              {fromCitiesList.map((city) => (
                <li
                  key={city.id}
                  onClick={() => {
                    setFrom(city.name);
                    setFromCitiesList([]);
                  }}
                  className="cursor-pointer px-3 py-2 border-t-2 text-gray-500 font-semibold"
                >
                  {city.name}
                </li>
              ))}
            </ul>
          ) : (
            <></>
          )}
        </div>
        <div className="p-3 flex items-center border-b md:border-b-0  md:w-1/4 md:border-r">
          <input
            type="text"
            value={to}
            onChange={(e) => {
              setTo(e.target.value);
              handleCitySearch(e.target.value, false);
            }}
            placeholder="Going to"
            className={styles.input}
          />
          {toCitiesList.length > 0 ? (
            <ul className="absolute top-full left-[calc(25%+0.75rem)] border w-1/4 bg-white rounded-b-xl">
              {toCitiesList.map((city) => (
                <li
                  key={city.id}
                  onClick={() => {
                    setTo(city.name);
                    setToCitiesList([]);
                  }}
                  className="cursor-pointer px-3 py-2 border-t-2 text-gray-500 font-semibold"
                >
                  {city.name}
                </li>
              ))}
            </ul>
          ) : (
            <></>
          )}
        </div>
        <div className="p-3 flex items-center md:w-1/4">
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={styles.input} />
        </div>

        <button className={styles.btn}>{isFetching ? <Loader /> : "Search"}</button>
      </form>
    </div>
  );
}
