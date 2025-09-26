const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const weatherAPI = {
  // Get current weather by city name with units
  getCurrentWeatherByCity: async (cityName, units = "metric") => {
    try {
      const response = await fetch(
        `${BASE_URL}/weather?q=${cityName}&appid=${API_KEY}&units=${units}`
      );

      if (!response.ok) {
        throw new Error(`Weather data not found for ${cityName}`);
      }

      return await response.json();
    } catch (error) {
      throw new Error(`Failed to fetch weather data: ${error.message}`);
    }
  },

  // Get current weather by coordinates with units
  getCurrentWeatherByCoords: async (lat, lon, units = "metric") => {
    try {
      const response = await fetch(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`
      );

      if (!response.ok) {
        throw new Error("Weather data not found for your location");
      }

      return await response.json();
    } catch (error) {
      throw new Error(`Failed to fetch weather data: ${error.message}`);
    }
  },

  // Get 5-day forecast with units
  getForecastByCoords: async (lat, lon, units = "metric") => {
    try {
      const response = await fetch(
        `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`
      );

      if (!response.ok) {
        throw new Error("Forecast data not found");
      }

      return await response.json();
    } catch (error) {
      throw new Error(`Failed to fetch forecast data: ${error.message}`);
    }
  },

  // Get geocoding data for city search
  getCoordinatesByCity: async (cityName) => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Location not found");
      }

      const data = await response.json();
      if (data.length === 0) {
        throw new Error("Location not found");
      }

      return { lat: data[0].lat, lon: data[0].lon };
    } catch (error) {
      throw new Error(`Failed to find location: ${error.message}`);
    }
  },
};
