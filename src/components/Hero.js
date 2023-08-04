import React from "react";

import logo from "../assets/logo.svg";

const Hero = () => (
  <div className="text-center hero my-5">
    <img className="mb-3 app-logo" src={logo} alt="React logo" width="120" />
    <h1 className="mb-4">OSINT LIAR Lagoon</h1>

    <p className="lead">
      This project enhances the OSINT LIAR product by providing additional OSINT tools
    </p>
  </div>
);

export default Hero;
