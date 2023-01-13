import React from "react";
import strongerLogo from "../assets/dumbbell.svg";

function Error() {
  return (
    <>
      <main>
        <div>
          <a href="" target="_blank" hidden>
            <img src={strongerLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="" target="_blank">
            <img src={strongerLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>OOPS!</h1>
      </main>
    </>
  );
}

export default Error;
