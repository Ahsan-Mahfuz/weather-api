import React, { useState } from "react";
import unitsIcon from "../../assets/icons/units.svg";
import downIcon from "../../assets/icons/down.svg";
import checkIcon from "../../assets/icons/check.svg";

const UnitDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-5 py-3 rounded-md bg-[#2A3140] text-white font-semibold hover:bg-[#3d4bbd] focus:outline-none focus:ring-2 focus:ring-[#4658D9] focus:ring-opacity-50 transition-colors duration-200"
      >
        <img src={unitsIcon} alt="units" />
        <span>Units</span>
        <img src={downIcon} alt="down" />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-64 bg-[#2A3140] rounded-lg shadow-xl text-white z-10">
          <div className="p-4">
            <h3 className="font-bold text-lg mb-2">Switch to Imperial</h3>
            <div className="space-y-2">
              <div className="flex items-center  p-2 rounded-md hover:bg-[#3d4bbd] cursor-pointer">
                <span>Temperature</span>
                <span className="text-[#86959E]">(°C)</span>
              </div>
              <div className="flex items-center  p-2 rounded-md hover:bg-[#3d4bbd] cursor-pointer">
                <span>Fahrenheit</span>
                <span className="text-[#86959E]">(°F)</span>
              </div>
            </div>
          </div>
          <hr className="border-[#1E2533]" />
          <div className="p-4">
            <h3 className="font-bold text-lg mb-2">Wind Speed</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded-md hover:bg-[#3d4bbd] cursor-pointer">
                <span>km/h</span>
                <img src={checkIcon} alt="check" />
              </div>
              <div className="flex items-center  p-2 rounded-md hover:bg-[#3d4bbd] cursor-pointer">
                <span>mph</span>
              </div>
            </div>
          </div>
          <hr className="border-[#1E2533]" />
          <div className="p-4">
            <h3 className="font-bold text-lg mb-2">Precipitation</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded-md hover:bg-[#3d4bbd] cursor-pointer">
                <div>
                  <span>Millimeters</span>
                  <span className="text-[#86959E]">(mm)</span>
                </div>
                <img src={checkIcon} alt="check" />
              </div>
              <div className="flex items-center  p-2 rounded-md hover:bg-[#3d4bbd] cursor-pointer">
                <span>Inches</span>
                <span className="text-[#86959E]">(in)</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnitDropDown;
