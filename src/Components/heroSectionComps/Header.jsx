import React from "react";

import logo from "../../assets/icons/logo192.svg";
import UnitDropDown from "./UnitDropDown";

const Header = () => {
  return (
    <div className="flex items-center justify-between pt-5">
      <section className="flex gap-3 items-center justify-center">
        <img src={logo} alt="logo" />
        <div>Weather Now</div>
      </section>
      <UnitDropDown />
    </div>
  );
};

export default Header;
