import React, { useEffect } from "react";
import Header from "../Components/heroSectionComps/Header";
import Title from "../Components/heroSectionComps/Title";
import SearchOption from "../Components/heroSectionComps/SearchOption";
import SomethingWentWrong from "../Components/ErrorComps/SomethingWentWrong";
import HourlyForecast from "../Components/heroSectionComps/HourlyForecast";
import WeatherDisplay from "../Components/heroSectionComps/WeatherDisplay";
import WeatherStatictics from "../Components/heroSectionComps/WeatherStatictics";
import DailyForecast from "../Components/heroSectionComps/DailyForecast";
import { useWeatherData } from "../hooks/useWeatherData";

const HeroSection = () => {
  const {
    currentWeather,
    hourlyForecast,
    dailyForecast,
    loading,
    error,
    fetchWeatherByLocation,
  } = useWeatherData();

  useEffect(() => {
    fetchWeatherByLocation();
  }, []);

  if (error) {
    return (
      <div className="mb-10 px-3">
        <Header />
        <Title />
        <SearchOption />
        <SomethingWentWrong message={error} />
      </div>
    );
  }

  return (
    <div className="mb-10 px-3">
      <Header />
      <Title />
      <SearchOption />

      {loading && (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      )}

      {!loading && currentWeather && (
        <section className="flex max-md:flex-col justify-between items-start gap-2 mt-10">
          <div className="w-2/3 max-md:w-full flex flex-col gap-10">
            <WeatherDisplay weatherData={currentWeather} />
            <WeatherStatictics weatherData={currentWeather} />
            <DailyForecast forecastData={dailyForecast} />
          </div>
          <div className="w-1/3 max-md:w-full">
            <HourlyForecast forecastData={hourlyForecast} />
          </div>
        </section>
      )}
    </div>
  );
};

export default HeroSection;
