import React from "react";
import { useWeather } from "../../contexts/WeatherContext";
import { unitConversions } from "../../utils/unitConversions";

const WeatherCard = ({ title, value }) => {
  return (
    <div className="bg-slate-800 p-6 rounded-2xl flex flex-col items-start justify-center shadow-lg transition-all duration-300 hover:scale-105">
      <h3 className="text-gray-300 text-sm font-light mb-2">{title}</h3>
      <p className="text-white text-3xl font-semibold">{value}</p>
    </div>
  );
};

const WeatherStatictics = ({ weatherData }) => {
  const { state } = useWeather();

  if (!weatherData) {
    const skeletonData = [
      { title: "Feels Like", value: "--" },
      { title: "Humidity", value: "--" },
      { title: "Wind", value: "--" },
      { title: "Precipitation", value: "--" },
    ];

    return (
      <div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {skeletonData.map((data, index) => (
            <WeatherCard key={index} title={data.title} value={data.value} />
          ))}
        </div>
      </div>
    );
  }

  const formatTemperature = (temp) => {
    const tempUnit = state.units.temperature;
    if (tempUnit === "imperial") {
      return `${Math.round(temp)}°F`;
    }
    return `${Math.round(temp)}°C`;
  };

  const formatWindSpeed = (windSpeedMps) => {
    if (state.units.windSpeed === "mph") {
      return `${unitConversions.mpsToMph(windSpeedMps)} mph`;
    }
    return `${unitConversions.mpsToKmh(windSpeedMps)} km/h`;
  };

  const formatPrecipitation = (precipitationMm = 0) => {
    if (state.units.precipitation === "inches") {
      return `${unitConversions.mmToInches(precipitationMm)} in`;
    }
    return `${precipitationMm} mm`;
  };

  const getPrecipitation = () => {
    let precipitation = 0;
    if (weatherData.rain && weatherData.rain["1h"]) {
      precipitation = weatherData.rain["1h"];
    } else if (weatherData.snow && weatherData.snow["1h"]) {
      precipitation = weatherData.snow["1h"];
    }
    return precipitation;
  };

  const weatherDataArray = [
    {
      title: "Feels Like",
      value: formatTemperature(weatherData.main.feels_like),
    },
    {
      title: "Humidity",
      value: `${weatherData.main.humidity}%`,
    },
    {
      title: "Wind",
      value: formatWindSpeed(weatherData.wind.speed),
    },
    {
      title: "Precipitation",
      value: formatPrecipitation(getPrecipitation()),
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {weatherDataArray.map((data, index) => (
          <WeatherCard key={index} title={data.title} value={data.value} />
        ))}
      </div>
    </div>
  );
};

export default WeatherStatictics;
