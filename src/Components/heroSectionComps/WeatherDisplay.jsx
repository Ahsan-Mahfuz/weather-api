import React from "react";
import weatherImage from "../../assets/images/weather.png";
import { useWeather } from "../../contexts/WeatherContext";

const WeatherDisplay = ({ weatherData }) => {
  const { state } = useWeather();

  if (!weatherData) {
    return (
      <div className="relative w-full mx-auto h-48 md:h-72 p-6 rounded-xl overflow-hidden shadow-2xl text-white">
        <img
          src={weatherImage}
          alt="Weather background with stars and gradient"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-lg">Loading weather data...</p>
          </div>
        </div>
      </div>
    );
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getWeatherEmoji = (weatherCode) => {
    const weatherMap = {
      "01d": "☀️",
      "01n": "🌙",
      "02d": "⛅",
      "02n": "☁️",
      "03d": "☁️",
      "03n": "☁️",
      "04d": "☁️",
      "04n": "☁️",
      "09d": "🌧️",
      "09n": "🌧️",
      "10d": "🌦️",
      "10n": "🌧️",
      "11d": "⛈️",
      "11n": "⛈️",
      "13d": "🌨️",
      "13n": "🌨️",
      "50d": "🌫️",
      "50n": "🌫️",
    };
    return weatherMap[weatherCode] || "☀️";
  };

  const formatTemperature = (temp) => {
    const tempUnit = state.units.temperature;
    if (tempUnit === "imperial") {
      return `${Math.round(temp)}°F`;
    }
    return `${Math.round(temp)}°C`;
  };

  const getLocationName = () => {
    const cityName = weatherData.name;
    const countryCode = weatherData.sys.country;
    const countryNames = {
      US: "USA",
      GB: "UK",
      DE: "Germany",
      FR: "France",
      IT: "Italy",
      ES: "Spain",
      CA: "Canada",
      AU: "Australia",
      JP: "Japan",
      CN: "China",
      IN: "India",
      BR: "Brazil",
      RU: "Russia",
      BD: "Bangladesh",
    };
    const countryName = countryNames[countryCode] || countryCode;
    return `${cityName}, ${countryName}`;
  };

  const weatherIcon = weatherData.weather[0].icon;
  const weatherEmoji = getWeatherEmoji(weatherIcon);
  const currentTemp = formatTemperature(weatherData.main.temp);
  const location = getLocationName();
  const currentDate = formatDate(weatherData.dt);

  return (
    <div
      className="
        relative 
        w-full 
        mx-auto 
        h-48 
        md:h-72 
        p-6 
        rounded-xl 
        overflow-hidden 
        shadow-2xl 
        text-white
      "
    >
      <img
        src={weatherImage}
        alt="Weather background with stars and gradient"
        className="
          absolute 
          inset-0 
          w-full 
          h-full 
          object-cover 
          object-center
        "
      />

      <div className="relative z-10 h-full ">
        <div className="flex flex-col justify-center max-sm:items-center h-full">
          <div className="text-2xl md:text-3xl font-bold mb-1">{location}</div>
          <div className="text-sm opacity-80">{currentDate}</div>

          <div className=" max-sm:flex items-center space-x-4 mt-5 hidden ">
            <div className="text-5xl md:text-6xl text-yellow-400">
              {weatherEmoji}
            </div>

            <div className="text-5xl md:text-7xl font-light leading-none">
              {currentTemp}
            </div>
          </div>
        </div>

        <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex items-center space-x-4 max-sm:hidden">
          <div className="text-5xl md:text-6xl text-yellow-400">
            {weatherEmoji}
          </div>

          <div className="text-5xl md:text-7xl font-light leading-none">
            {currentTemp}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
