import React, { useState } from "react";
import downIcon from "../../assets/icons/down.svg";

const HourlyForecastMain = ({
  forecast,
  selectedDay,
  setSelectedDay,
  days,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDaySelect = (day) => {
    setSelectedDay(day);
    setIsDropdownOpen(false);
  };

  return (
    <div className="bg-slate-800  p-4 rounded-3xl w-full  border border-slate-700  overflow-hidden mt-6 md:mt-0 relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-xl font-bold">Hourly forecast</h2>
        <div className="relative">
          <button
            className="flex items-center gap-3 bg-slate-700  text-white font-semibold rounded-full py-1.5 px-5 cursor-pointer border border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all duration-200"
            onClick={toggleDropdown}
          >
            <span>{selectedDay}</span>
            <img src={downIcon} alt="down" />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-12 right-0  z-10 w-48 bg-[#2A3140] backdrop-blur-md bg-opacity-70 rounded-3xl border border-slate-700 shadow-xl  overflow-hidden">
              {days.map((day) => (
                <div
                  key={day}
                  className={`font-semibold text-lg py-3 px-4  cursor-pointer transition-all duration-300 ease-in-out ${
                    selectedDay === day
                      ? "bg-slate-700 text-white"
                      : "text-slate-300 hover:bg-slate-700 hover:text-white"
                  }`}
                  onClick={() => handleDaySelect(day)}
                >
                  {day}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="space-y-3">
        {forecast[selectedDay].map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-slate-700 rounded-2xl p-4 transition-all duration-300 ease-in-out hover:bg-slate-600 cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <span className="text-white text-2xl">{item.icon}</span>
              <span className="text-slate-200 font-medium">{item.time}</span>
            </div>
            <span className="text-white font-bold text-lg">{item.temp}°</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const HourlyForecast = () => {
  const [selectedDay, setSelectedDay] = useState("Tuesday");

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const mockForecast = {
    Monday: [
      { time: "3 PM", temp: 20, icon: "☁️" },
      { time: "4 PM", temp: 20, icon: "☁️" },
      { time: "5 PM", temp: 20, icon: "☀️" },
      { time: "6 PM", temp: 19, icon: "☁️" },
      { time: "7 PM", temp: 18, icon: "☁️" },
      { time: "8 PM", temp: 18, icon: "🌊" },
      { time: "9 PM", temp: 17, icon: "☁️" },
      { time: "10 PM", temp: 17, icon: "☁️" },
    ],
    Tuesday: [
      { time: "3 PM", temp: 18, icon: "☁️" },
      { time: "4 PM", temp: 18, icon: "☁️" },
      { time: "5 PM", temp: 19, icon: "☀️" },
      { time: "6 PM", temp: 17, icon: "☁️" },
      { time: "7 PM", temp: 16, icon: "☁️" },
      { time: "8 PM", temp: 16, icon: "🌊" },
      { time: "9 PM", temp: 15, icon: "☁️" },
      { time: "10 PM", temp: 15, icon: "☁️" },
    ],
    Wednesday: [
      { time: "3 PM", temp: 19, icon: "☁️" },
      { time: "4 PM", temp: 20, icon: "☀️" },
      { time: "5 PM", temp: 21, icon: "☀️" },
      { time: "6 PM", temp: 20, icon: "☁️" },
      { time: "7 PM", temp: 19, icon: "☁️" },
      { time: "8 PM", temp: 19, icon: "🌊" },
      { time: "9 PM", temp: 18, icon: "☁️" },
      { time: "10 PM", temp: 18, icon: "☁️" },
    ],
    Thursday: [
      { time: "3 PM", temp: 22, icon: "☁️" },
      { time: "4 PM", temp: 21, icon: "☁️" },
      { time: "5 PM", temp: 23, icon: "☀️" },
      { time: "6 PM", temp: 22, icon: "☁️" },
      { time: "7 PM", temp: 21, icon: "☁️" },
      { time: "8 PM", temp: 20, icon: "🌊" },
      { time: "9 PM", temp: 19, icon: "☁️" },
      { time: "10 PM", temp: 19, icon: "☁️" },
    ],
    Friday: [
      { time: "3 PM", temp: 25, icon: "☀️" },
      { time: "4 PM", temp: 24, icon: "☀️" },
      { time: "5 PM", temp: 23, icon: "☀️" },
      { time: "6 PM", temp: 22, icon: "☁️" },
      { time: "7 PM", temp: 21, icon: "☁️" },
      { time: "8 PM", temp: 20, icon: "🌊" },
      { time: "9 PM", temp: 19, icon: "☁️" },
      { time: "10 PM", temp: 18, icon: "☁️" },
    ],
    Saturday: [
      { time: "3 PM", temp: 24, icon: "☀️" },
      { time: "4 PM", temp: 23, icon: "☀️" },
      { time: "5 PM", temp: 22, icon: "☁️" },
      { time: "6 PM", temp: 21, icon: "☁️" },
      { time: "7 PM", temp: 20, icon: "☁️" },
      { time: "8 PM", temp: 19, icon: "🌊" },
      { time: "9 PM", temp: 18, icon: "☁️" },
      { time: "10 PM", temp: 17, icon: "☁️" },
    ],
    Sunday: [
      { time: "3 PM", temp: 23, icon: "☀️" },
      { time: "4 PM", temp: 22, icon: "☀️" },
      { time: "5 PM", temp: 21, icon: "☁️" },
      { time: "6 PM", temp: 20, icon: "☁️" },
      { time: "7 PM", temp: 19, icon: "☁️" },
      { time: "8 PM", temp: 18, icon: "🌊" },
      { time: "9 PM", temp: 17, icon: "☁️" },
      { time: "10 PM", temp: 16, icon: "☁️" },
    ],
  };

  return (
    <div className="  font-inter text-white flex items-center justify-center ">
      <HourlyForecastMain
        forecast={mockForecast}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        days={days}
      />
    </div>
  );
};

export default HourlyForecast;
