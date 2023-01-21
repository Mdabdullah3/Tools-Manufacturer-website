import React from "react";
import About from "./About";
import Banner from "./Banner";
import Dontate from "./Dontate";
import PayDesing from "./PayDesing";
import Stores from "./Stores";
import Team from "./Team";

const DonHome = () => {
  return (
    <div>
      <Banner></Banner>
      <About></About>
      <Stores></Stores>
      <Dontate />
      <PayDesing />
      <Team />
    </div>
  );
};

export default DonHome;
