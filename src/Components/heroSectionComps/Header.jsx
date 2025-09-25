import React from "react";

import logo from "../../assets/icons/logo192.svg";
import unitsIcon from "../../assets/icons/units.svg";
import downIcon from "../../assets/icons/down.svg";
import UnitDropDown from "./UnitDropDown";

const Header = () => {
  return (
    <div className="flex items-center justify-between pt-5">
      <section className="flex gap-3 items-center justify-center">
        <img src={logo} alt="logo" />
        <div>Weather Now</div>
      </section>
      {/* <section className="bg-[#262540] rounded-2xl flex gap-3 px-7 py-3">
        <img src={unitsIcon} alt="units" />
        <div>Units</div>
        <img src={downIcon} alt="down" />
      </section> */}
      <UnitDropDown />
    </div>
  );
};

export default Header;
