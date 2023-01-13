import React, { useContext } from "react";
import { DataContext } from "../App";
import CountdownTimer from "../components/CountdownTimer";

function Home() {
  return (
    <>
      <div>
        <h1>Home</h1>
      </div>
      <CountdownTimer />
    </>
  );
}

export default Home;
