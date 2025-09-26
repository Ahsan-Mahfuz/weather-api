export const unitConversions = {
  celsiusToFahrenheit: (celsius) => {
    return Math.round((celsius * 9) / 5 + 32);
  },

  fahrenheitToCelsius: (fahrenheit) => {
    return Math.round(((fahrenheit - 32) * 5) / 9);
  },

  mpsToKmh: (mps) => {
    return Math.round(mps * 3.6);
  },

  mpsToMph: (mps) => {
    return Math.round(mps * 2.237);
  },

  mmToInches: (mm) => {
    return Math.round(mm * 0.0394 * 100) / 100;
  },

  inchesToMm: (inches) => {
    return Math.round(inches * 25.4 * 100) / 100;
  },

  formatTemperature: (temp, unit) => {
    const symbol = unit === "imperial" ? "°F" : "°C";
    return `${Math.round(temp)}${symbol}`;
  },

  formatWindSpeed: (windSpeedMps, unit) => {
    if (unit === "mph") {
      return `${unitConversions.mpsToMph(windSpeedMps)} mph`;
    }
    return `${unitConversions.mpsToKmh(windSpeedMps)} km/h`;
  },

  formatPrecipitation: (precipitationMm, unit) => {
    if (unit === "inches") {
      return `${unitConversions.mmToInches(precipitationMm)} in`;
    }
    return `${precipitationMm} mm`;
  },
};
