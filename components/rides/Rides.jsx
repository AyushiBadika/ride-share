import React from "react";
import styles from "./Rides.module.css";

export default function Rides({ rides }) {
  return (
    <div className="mt-[42vh] grid grid-cols-3 px-36 gap-12 py-20 pt-28 bg-white">
      <h1>Rides</h1>
      {rides.map((ride) => {
        return (
          <div>
            <div className={styles.pipeLine}>
              <div className={styles.circle}></div>
              <div className={styles.pipe}></div>
              <div className={styles.circle}></div>
            </div>
            <div>
              <div>{ride.from}</div>
              <div>{ride.from}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
