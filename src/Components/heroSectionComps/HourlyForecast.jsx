import React, { useState, useEffect, use, useCallback } from "react";
import downIcon from "../../assets/icons/down.svg";
import { useWeather } from "../../contexts/WeatherContext";

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

  const getWeatherIcon = (iconCode) => {
    if (!iconCode) return "https://openweathermap.org/img/wn/01d@2x.png";
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  if (!forecast || Object.keys(forecast).length === 0) {
    return (
      <div className="bg-slate-800 p-4 rounded-3xl w-full border border-slate-700 overflow-hidden mt-6 md:mt-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-xl font-bold">Hourly forecast</h2>
          <div className="bg-slate-700 text-white rounded-full py-1.5 px-5">
            <span className="opacity-50">Loading...</span>
          </div>
        </div>
        <div className="space-y-3 ">
          {Array(8)
            .fill()
            .map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-slate-700 rounded-2xl p-4"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-6 h-6 bg-slate-600 rounded animate-pulse"></div>
                  <span className="text-slate-400">--:--</span>
                </div>
                <span className="text-slate-400">--°</span>
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800 p-4 rounded-3xl w-full border min-h-[50vh] border-slate-700 overflow-hidden mt-6 md:mt-0 relative ">
      <div className="flex items-center justify-between mb-4 ">
        <h2 className="text-white text-xl font-bold">Hourly forecast</h2>
        <div className="relative ">
          <button
            className="flex items-center gap-3 bg-slate-700  text-white font-semibold rounded-full py-1.5 px-5 cursor-pointer border border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all duration-200"
            onClick={toggleDropdown}
          >
            <span>{selectedDay}</span>
            <img
              src={downIcon}
              alt="down"
              className={`transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-12 right-0 z-50 w-48 bg-[#2A3140] backdrop-blur-md bg-opacity-70 rounded-3xl border border-slate-700 shadow-xl overflow-hidden">
              {days.map((day) => (
                <div
                  key={day}
                  className={`font-semibold text-lg py-3 px-4 cursor-pointer transition-all duration-300 ease-in-out ${
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
      <div className="space-y-3 ">
        {forecast[selectedDay] &&
          forecast[selectedDay].map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-slate-700 rounded-2xl p-4 transition-all duration-300 ease-in-out hover:bg-slate-600 cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={getWeatherIcon(item.icon)}
                  alt={item.description || "weather"}
                  className="w-8 h-8"
                  onError={(e) => {
                    e.target.src =
                      "https://openweathermap.org/img/wn/01d@2x.png";
                  }}
                />
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
  const { state } = useWeather();
  const [selectedDay, setSelectedDay] = useState("Today");
  const [processedForecast, setProcessedForecast] = useState({});
  const [days, setDays] = useState([]);

  const formatTemperature = (temp) => {
    return Math.round(temp);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
    });
  };

  const formatDay = (date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString("en-US", { weekday: "long" });
    }
  };

  const generateHourlyFromDaily = useCallback((dayForecast) => {
    const hours = [];
    const baseTemp = dayForecast.temp.max;
    const tempVariation = (dayForecast.temp.max - dayForecast.temp.min) / 8;

    for (let i = 0; i < 8; i++) {
      const hour = 12 + i;
      const temp = Math.round(baseTemp - tempVariation * i);

      hours.push({
        time: hour > 12 ? `${hour - 12} PM` : `${hour} PM`,
        temp: formatTemperature(temp),
        icon: dayForecast.icon,
        description: dayForecast.description,
      });
    }

    return hours;
  }, []);

  const processHourlyForecast = useCallback(() => {
    if (!state.hourlyForecast || state.hourlyForecast.length === 0) {
      setProcessedForecast({});
      setDays([]);
      return;
    }

    const forecast = {};
    const daySet = new Set();

    state.hourlyForecast.forEach((item) => {
      const dayKey = formatDay(item.time);
      daySet.add(dayKey);

      if (!forecast[dayKey]) {
        forecast[dayKey] = [];
      }

      forecast[dayKey].push({
        time: formatTime(item.time),
        temp: formatTemperature(item.temp),
        icon: item.icon,
        description: item.description,
      });
    });

    const allDays = ["Today", "Tomorrow"];

    if (state.dailyForecast && state.dailyForecast.length > 0) {
      state.dailyForecast.forEach((day, index) => {
        if (index > 1) {
          const dayName = formatDay(day.date);
          if (!allDays.includes(dayName)) {
            allDays.push(dayName);
          }
        }
      });
    }

    allDays.forEach((dayKey) => {
      if (!forecast[dayKey] && state.dailyForecast) {
        const dayForecast = state.dailyForecast.find(
          (d) => formatDay(d.date) === dayKey
        );
        if (dayForecast) {
          forecast[dayKey] = generateHourlyFromDaily(dayForecast);
        }
      }
    });

    setProcessedForecast(forecast);
    setDays(allDays.filter((day) => forecast[day] && forecast[day].length > 0));

    if (allDays.length > 0 && !allDays.includes(selectedDay)) {
      setSelectedDay(allDays[0]);
    }
  }, [
    state.hourlyForecast,
    state.dailyForecast,
    selectedDay,
    generateHourlyFromDaily,
  ]);

  useEffect(() => {
    if (state.hourlyForecast && state.hourlyForecast.length > 0) {
      processHourlyForecast();
    }
  }, [processHourlyForecast, state.hourlyForecast]);

  if (!state.currentWeather && !state.loading) {
    return (
      <div className="bg-slate-800 p-4 rounded-3xl w-full border border-slate-700 overflow-hidden mt-6 md:mt-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-xl font-bold">Hourly forecast</h2>
        </div>
        <div className="text-center py-8">
          <p className="text-slate-400">
            Search for a location to see hourly forecast
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="font-inter text-white flex items-center justify-center ">
      <HourlyForecastMain
        forecast={processedForecast}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        days={days}
      />
    </div>
  );
};

export default HourlyForecast;
