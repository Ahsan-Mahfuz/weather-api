import React, { createContext, useContext, useReducer } from "react";

const WeatherContext = createContext();

const initialState = {
  currentWeather: null,
  hourlyForecast: [],
  dailyForecast: [],
  loading: false,
  error: null,
  searchQuery: "",
  coordinates: { lat: null, lon: null },
  units: {
    temperature: "metric",
    windSpeed: "kmh",
    precipitation: "mm",
  },
};

const weatherReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "SET_CURRENT_WEATHER":
      return {
        ...state,
        currentWeather: action.payload,
        loading: false,
        error: null,
      };
    case "SET_HOURLY_FORECAST":
      return { ...state, hourlyForecast: action.payload };
    case "SET_DAILY_FORECAST":
      return { ...state, dailyForecast: action.payload };
    case "SET_COORDINATES":
      return { ...state, coordinates: action.payload };
    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.payload };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    case "SET_TEMPERATURE_UNIT":
      return {
        ...state,
        units: { ...state.units, temperature: action.payload },
      };
    case "SET_WIND_SPEED_UNIT":
      return {
        ...state,
        units: { ...state.units, windSpeed: action.payload },
      };
    case "SET_PRECIPITATION_UNIT":
      return {
        ...state,
        units: { ...state.units, precipitation: action.payload },
      };
    default:
      return state;
  }
};

export const WeatherProvider = ({ children }) => {
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  return (
    <WeatherContext.Provider value={{ state, dispatch }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};
