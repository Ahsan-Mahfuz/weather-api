import React from "react";
import { useWeather } from "../../contexts/WeatherContext";

const getWeatherSVG = (condition) => {
  const commonClasses = "w-10 h-10";
  switch (condition) {
    case "Sunny":
    case "Clear":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`${commonClasses} text-yellow-400`}
        >
          <path
            fillRule="evenodd"
            d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 7.5a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H8.25a.75.75 0 01-.75-.75zm8.25 0a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75zM15 12a3 3 0 11-6 0 3 3 0 016 0zM17.25 7.5a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V8.25a.75.75 0 00-.75-.75h-.008zM12 18a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V18a.75.75 0 01.75-.75zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM18 12a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H18a.75.75 0 01-.75-.75zM6.75 16.5a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75v-.008a.75.75 0 00-.75-.75h-.008zM16.5 16.5a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75v-.008a.75.75 0 00-.75-.75h-.008z"
            clipRule="evenodd"
          />
        </svg>
      );
    case "Cloudy":
    case "Clouds":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`${commonClasses} text-gray-400`}
        >
          <path d="M11.458 3.513A8.47 8.47 0 0012 3a8.25 8.25 0 018.25 8.25c0 .99-.17 1.954-.492 2.859-1.284 1.258-2.89 2.106-4.685 2.502a5.97 5.97 0 01-2.736-1.516 3.75 3.75 0 00-1.884-1.157 3.75 3.75 0 00-3.327 1.144c-.752.689-1.391 1.545-1.933 2.533a9.427 9.427 0 01-1.353-2.193c-.366-.887-.61-1.805-.724-2.756A8.243 8.243 0 013.75 11.25a8.25 8.25 0 017.708-7.737z" />
        </svg>
      );
    case "Showers":
    case "Rain":
    case "Drizzle":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`${commonClasses} text-blue-400`}
        >
          <path d="M11.458 3.513A8.47 8.47 0 0012 3a8.25 8.25 0 018.25 8.25c0 .99-.17 1.954-.492 2.859-1.284 1.258-2.89 2.106-4.685 2.502a5.97 5.97 0 01-2.736-1.516 3.75 3.75 0 00-1.884-1.157 3.75 3.75 0 00-3.327 1.144c-.752.689-1.391 1.545-1.933 2.533a9.427 9.427 0 01-1.353-2.193c-.366-.887-.61-1.805-.724-2.756A8.243 8.243 0 013.75 11.25a8.25 8.25 0 017.708-7.737zM12 21a.75.75 0 01-.75-.75v-3.351a.75.75 0 011.5 0v3.351a.75.75 0 01-.75.75zM15 21a.75.75 0 01-.75-.75v-3.351a.75.75 0 011.5 0v3.351a.75.75 0 01-.75.75zM9 21a.75.75 0 01-.75-.75v-3.351a.75.75 0 011.5 0v3.351a.75.75 0 01-.75.75z" />
        </svg>
      );
    case "Thunderstorm":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`${commonClasses} text-gray-400`}
        >
          <path d="M11.458 3.513A8.47 8.47 0 0012 3a8.25 8.25 0 018.25 8.25c0 .99-.17 1.954-.492 2.859-1.284 1.258-2.89 2.106-4.685 2.502a5.97 5.97 0 01-2.736-1.516 3.75 3.75 0 00-1.884-1.157 3.75 3.75 0 00-3.327 1.144c-.752.689-1.391 1.545-1.933 2.533a9.427 9.427 0 01-1.353-2.193c-.366-.887-.61-1.805-.724-2.756A8.243 8.243 0 013.75 11.25a8.25 8.25 0 017.708-7.737zM15 16.5a.75.75 0 01-.75.75H12a.75.75 0 01-.75-.75v-2.25a.75.75 0 011.5 0V16.5h1.5a.75.75 0 01.75.75zM10.875 18a.75.75 0 01-.75-.75v-2.25a.75.75 0 011.5 0V17.25h1.5a.75.75 0 01.75.75h-3z" />
        </svg>
      );
    case "RainMix":
    case "Snow":
    case "Mist":
    case "Fog":
    case "Atmosphere":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`${commonClasses} text-blue-400`}
        >
          <path d="M11.458 3.513A8.47 8.47 0 0012 3a8.25 8.25 0 018.25 8.25c0 .99-.17 1.954-.492 2.859-1.284 1.258-2.89 2.106-4.685 2.502a5.97 5.97 0 01-2.736-1.516 3.75 3.75 0 00-1.884-1.157 3.75 3.75 0 00-3.327 1.144c-.752.689-1.391 1.545-1.933 2.533a9.427 9.427 0 01-1.353-2.193c-.366-.887-.61-1.805-.724-2.756A8.243 8.243 0 013.75 11.25a8.25 8.25 0 017.708-7.737zM12 21a.75.75 0 01-.75-.75v-3.351a.75.75 0 011.5 0v3.351a.75.75 0 01-.75.75zM15 21a.75.75 0 01-.75-.75v-3.351a.75.75 0 011.5 0v3.351a.75.75 0 01-.75.75zM9 21a.75.75 0 01-.75-.75v-3.351a.75.75 0 011.5 0v3.351a.75.75 0 01-.75.75z" />
        </svg>
      );
    default:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`${commonClasses} text-yellow-400`}
        >
          <path
            fillRule="evenodd"
            d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 7.5a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H8.25a.75.75 0 01-.75-.75zm8.25 0a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75zM15 12a3 3 0 11-6 0 3 3 0 016 0zM17.25 7.5a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V8.25a.75.75 0 00-.75-.75h-.008zM12 18a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V18a.75.75 0 01.75-.75zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM18 12a.75.75 0 01.75-.75h2.25a.75.75 0 010 1.5H18a.75.75 0 01-.75-.75zM6.75 16.5a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75v-.008a.75.75 0 00-.75-.75h-.008zM16.5 16.5a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75v-.008a.75.75 0 00-.75-.75h-.008z"
            clipRule="evenodd"
          />
        </svg>
      );
  }
};

const DailyForecast = ({ forecastData }) => {
  const { state } = useWeather();

  if (!forecastData || forecastData.length === 0) {
    const skeletonData = Array(7)
      .fill()
      .map((_, index) => ({
        day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][index],
        tempHigh: "--",
        tempLow: "--",
        condition: "Clear",
      }));

    return (
      <div className="text-white font-inter">
        <div className="mx-auto">
          <h1 className="text-xl font-semibold mb-6">Daily forecast</h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {skeletonData.map((day, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-4 bg-slate-800 rounded-2xl shadow-lg"
              >
                <div className="text-sm font-medium opacity-50">{day.day}</div>
                <div className="my-4 opacity-50">
                  {getWeatherSVG(day.condition)}
                </div>
                <div className="flex justify-between items-center w-full mt-2">
                  <div className="text-sm font-semibold opacity-50">
                    {day.tempHigh}°
                  </div>
                  <div className="text-sm font-light opacity-30">
                    {day.tempLow}°
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const formatTemperature = (temp) => {
    return Math.round(temp);
  };

  const getTemperatureSymbol = () => {
    return state.units.temperature === "imperial" ? "°F" : "°C";
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
      return date.toLocaleDateString("en-US", { weekday: "short" });
    }
  };

  const mapWeatherCondition = (description) => {
    const desc = description.toLowerCase();
    if (desc.includes("clear") || desc.includes("sun")) return "Clear";
    if (desc.includes("cloud")) return "Clouds";
    if (desc.includes("rain") || desc.includes("drizzle")) return "Rain";
    if (desc.includes("thunder") || desc.includes("storm"))
      return "Thunderstorm";
    if (desc.includes("snow")) return "Snow";
    if (desc.includes("mist") || desc.includes("fog")) return "Mist";
    return "Clear";
  };

  const processedForecastData = forecastData.map((day) => ({
    day: formatDay(day.date),
    tempHigh: formatTemperature(day.temp.max),
    tempLow: formatTemperature(day.temp.min),
    condition: mapWeatherCondition(day.description),
  }));

  const tempSymbol = getTemperatureSymbol();

  return (
    <div className="text-white font-inter">
      <div className="mx-auto">
        <h1 className="text-xl font-semibold mb-6">Daily forecast</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {processedForecastData.map((day, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-4 bg-slate-800 rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105"
            >
              <div className="text-sm font-medium">{day.day}</div>
              <div className="my-4">{getWeatherSVG(day.condition)}</div>
              <div className="flex justify-between items-center w-full mt-2">
                <div className="text-sm font-semibold">
                  {day.tempHigh}
                  {tempSymbol}
                </div>
                <div className="text-sm font-light opacity-70">
                  {day.tempLow}
                  {tempSymbol}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DailyForecast;
