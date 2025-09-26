import { useWeather } from "../contexts/WeatherContext";
import { weatherAPI } from "../services/weatherAPI";
import { unitConversions } from "../utils/unitConversions";

export const useWeatherData = () => {
  const { state, dispatch } = useWeather();

  const fetchWeatherByCity = async (cityName) => {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "CLEAR_ERROR" });

    try {
      const coords = await weatherAPI.getCoordinatesByCity(cityName);
      dispatch({ type: "SET_COORDINATES", payload: coords });

      const tempUnit = state.units.temperature;

      const currentWeather = await weatherAPI.getCurrentWeatherByCoords(
        coords.lat,
        coords.lon,
        tempUnit
      );
      dispatch({ type: "SET_CURRENT_WEATHER", payload: currentWeather });

      const forecastData = await weatherAPI.getForecastByCoords(
        coords.lat,
        coords.lon,
        tempUnit
      );

      const hourlyForecast = forecastData.list.slice(0, 8).map((item) => ({
        time: new Date(item.dt * 1000),
        temp: Math.round(item.main.temp),
        description: item.weather[0].description,
        icon: item.weather[0].icon,
        humidity: item.main.humidity,
        windSpeed: item.wind.speed,
        precipitation: item.rain ? item.rain["3h"] || 0 : 0,
      }));

      const dailyForecast = [];
      const processedDates = new Set();

      forecastData.list.forEach((item) => {
        const date = new Date(item.dt * 1000).toDateString();
        if (!processedDates.has(date) && dailyForecast.length < 5) {
          dailyForecast.push({
            date: new Date(item.dt * 1000),
            temp: {
              max: Math.round(item.main.temp_max),
              min: Math.round(item.main.temp_min),
            },
            description: item.weather[0].description,
            icon: item.weather[0].icon,
            humidity: item.main.humidity,
            windSpeed: item.wind.speed,
            precipitation: item.rain ? item.rain["3h"] || 0 : 0,
          });
          processedDates.add(date);
        }
      });

      dispatch({ type: "SET_HOURLY_FORECAST", payload: hourlyForecast });
      dispatch({ type: "SET_DAILY_FORECAST", payload: dailyForecast });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  const fetchWeatherByLocation = async () => {
    if (!navigator.geolocation) {
      dispatch({
        type: "SET_ERROR",
        payload: "Geolocation is not supported by this browser.",
      });
      return;
    }

    dispatch({ type: "SET_LOADING", payload: true });

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const coords = { lat: latitude, lon: longitude };
          dispatch({ type: "SET_COORDINATES", payload: coords });

          const tempUnit = state.units.temperature;

          const currentWeather = await weatherAPI.getCurrentWeatherByCoords(
            latitude,
            longitude,
            tempUnit
          );
          dispatch({ type: "SET_CURRENT_WEATHER", payload: currentWeather });

          const forecastData = await weatherAPI.getForecastByCoords(
            latitude,
            longitude,
            tempUnit
          );

          const hourlyForecast = forecastData.list.slice(0, 8).map((item) => ({
            time: new Date(item.dt * 1000),
            temp: Math.round(item.main.temp),
            description: item.weather[0].description,
            icon: item.weather[0].icon,
            humidity: item.main.humidity,
            windSpeed: item.wind.speed,
            precipitation: item.rain ? item.rain["3h"] || 0 : 0,
          }));

          const dailyForecast = [];
          const processedDates = new Set();

          forecastData.list.forEach((item) => {
            const date = new Date(item.dt * 1000).toDateString();
            if (!processedDates.has(date) && dailyForecast.length < 5) {
              dailyForecast.push({
                date: new Date(item.dt * 1000),
                temp: {
                  max: Math.round(item.main.temp_max),
                  min: Math.round(item.main.temp_min),
                },
                description: item.weather[0].description,
                icon: item.weather[0].icon,
                humidity: item.main.humidity,
                windSpeed: item.wind.speed,
                precipitation: item.rain ? item.rain["3h"] || 0 : 0,
              });
              processedDates.add(date);
            }
          });

          dispatch({ type: "SET_HOURLY_FORECAST", payload: hourlyForecast });
          dispatch({ type: "SET_DAILY_FORECAST", payload: dailyForecast });
        } catch (error) {
          dispatch({ type: "SET_ERROR", payload: error.message });
        }
      },
      (error) => {
        let errorMessage = "Unable to retrieve your location.";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              "Location access denied. Please search for a city instead.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
          default:
            break;
        }
        dispatch({ type: "SET_ERROR", payload: errorMessage });
      }
    );
  };

  const getFormattedWeatherData = (weatherData) => {
    if (!weatherData) return null;

    return {
      ...weatherData,
      formattedTemp: unitConversions.formatTemperature(
        weatherData.main.temp,
        state.units.temperature
      ),
      formattedFeelsLike: unitConversions.formatTemperature(
        weatherData.main.feels_like,
        state.units.temperature
      ),
      formattedWindSpeed: unitConversions.formatWindSpeed(
        weatherData.wind.speed,
        state.units.windSpeed
      ),
    };
  };

  return {
    ...state,
    fetchWeatherByCity,
    fetchWeatherByLocation,
    getFormattedWeatherData,
  };
};
