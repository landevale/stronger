import React, { useContext } from "react";
import { DataContext } from "../App";
import strongerLogo from "../assets/dumbbell.svg";

function Home() {
  return (
    <>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={strongerLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={strongerLogo} className="logo react" alt="React logo" />
        </a>
      </div> */}
      <div>
        <h1>Home</h1>
      </div>
    </>
  );
}

export default Home;
