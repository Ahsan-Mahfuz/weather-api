import React, { useState, useRef, useEffect } from "react";
import unitsIcon from "../../assets/icons/units.svg";
import downIcon from "../../assets/icons/down.svg";
import checkIcon from "../../assets/icons/check.svg";
import { useWeather } from "../../contexts/WeatherContext";
import { useWeatherData } from "../../hooks/useWeatherData";

const UnitDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { state, dispatch } = useWeather();
  const { fetchWeatherByLocation } = useWeatherData();
  const dropdownRef = useRef(null);

  const { units, currentWeather, coordinates } = state;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const refetchWeatherData = async () => {
    if (currentWeather && coordinates.lat && coordinates.lon) {
      await fetchWeatherByLocation();
    }
  };

  const handleTemperatureUnitChange = async (unit) => {
    dispatch({ type: "SET_TEMPERATURE_UNIT", payload: unit });
    await refetchWeatherData();
  };

  const handleWindSpeedUnitChange = (unit) => {
    dispatch({ type: "SET_WIND_SPEED_UNIT", payload: unit });
  };

  const handlePrecipitationUnitChange = (unit) => {
    dispatch({ type: "SET_PRECIPITATION_UNIT", payload: unit });
  };

  return (
    <div className="relative z-50" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-5 py-3 rounded-md bg-[#2A3140] text-white font-semibold hover:bg-[#3d4bbd] focus:outline-none focus:ring-2 focus:ring-[#4658D9] focus:ring-opacity-50 transition-colors duration-200"
      >
        <img src={unitsIcon} alt="units" />
        <span>Units</span>
        <img
          src={downIcon}
          alt="down"
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-64 bg-[#2A3140] rounded-lg shadow-xl text-white z-10 border border-[#3d4bbd]">
          {/* Temperature Units */}
          <div className="p-4">
            <h3 className="font-bold text-lg mb-2">Temperature</h3>
            <div className="space-y-2">
              <div
                className="flex items-center justify-between p-2 rounded-md hover:bg-[#3d4bbd] cursor-pointer"
                onClick={() => handleTemperatureUnitChange("metric")}
              >
                <div>
                  <span>Celsius</span>
                  <span className="text-[#86959E] ml-2">(°C)</span>
                </div>
                {units.temperature === "metric" && (
                  <img src={checkIcon} alt="check" />
                )}
              </div>
              <div
                className="flex items-center justify-between p-2 rounded-md hover:bg-[#3d4bbd] cursor-pointer"
                onClick={() => handleTemperatureUnitChange("imperial")}
              >
                <div>
                  <span>Fahrenheit</span>
                  <span className="text-[#86959E] ml-2">(°F)</span>
                </div>
                {units.temperature === "imperial" && (
                  <img src={checkIcon} alt="check" />
                )}
              </div>
            </div>
          </div>

          <hr className="border-[#1E2533]" />

          {/* Wind Speed Units */}
          <div className="p-4">
            <h3 className="font-bold text-lg mb-2">Wind Speed</h3>
            <div className="space-y-2">
              <div
                className="flex items-center justify-between p-2 rounded-md hover:bg-[#3d4bbd] cursor-pointer"
                onClick={() => handleWindSpeedUnitChange("kmh")}
              >
                <span>km/h</span>
                {units.windSpeed === "kmh" && (
                  <img src={checkIcon} alt="check" />
                )}
              </div>
              <div
                className="flex items-center justify-between p-2 rounded-md hover:bg-[#3d4bbd] cursor-pointer"
                onClick={() => handleWindSpeedUnitChange("mph")}
              >
                <span>mph</span>
                {units.windSpeed === "mph" && (
                  <img src={checkIcon} alt="check" />
                )}
              </div>
            </div>
          </div>

          <hr className="border-[#1E2533]" />

          {/* Precipitation Units */}
          <div className="p-4">
            <h3 className="font-bold text-lg mb-2">Precipitation</h3>
            <div className="space-y-2">
              <div
                className="flex items-center justify-between p-2 rounded-md hover:bg-[#3d4bbd] cursor-pointer"
                onClick={() => handlePrecipitationUnitChange("mm")}
              >
                <div>
                  <span>Millimeters</span>
                  <span className="text-[#86959E] ml-2">(mm)</span>
                </div>
                {units.precipitation === "mm" && (
                  <img src={checkIcon} alt="check" />
                )}
              </div>
              <div
                className="flex items-center justify-between p-2 rounded-md hover:bg-[#3d4bbd] cursor-pointer"
                onClick={() => handlePrecipitationUnitChange("inches")}
              >
                <div>
                  <span>Inches</span>
                  <span className="text-[#86959E] ml-2">(in)</span>
                </div>
                {units.precipitation === "inches" && (
                  <img src={checkIcon} alt="check" />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnitDropDown;
