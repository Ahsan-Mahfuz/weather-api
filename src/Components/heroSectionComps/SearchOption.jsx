import React from "react";
import searchIcon from "../../assets/icons/search.svg";
import { useState } from "react";
import { useWeatherData } from "../../hooks/useWeatherData";

const SearchOption = () => {
  const [searchValue, setSearchValue] = useState("");
  const { fetchWeatherByCity, loading } = useWeatherData();

  const handleSearch = async (e) => {
    e.preventDefault();

    if (searchValue.trim()) {
      await fetchWeatherByCity(searchValue.trim());
      setSearchValue("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  return (
    <div className="flex items-center justify-center p-4 font-sans">
      <div className="flex flex-col sm:flex-row items-center justify-center w-full max-w-2xl gap-4">
        <form
          onSubmit={handleSearch}
          className="flex items-center w-full sm:w-2/3 px-4 py-3 rounded-xl bg-[#2A3140] flex-grow shadow-lg"
        >
          <img src={searchIcon} alt="search" className="mr-3" />
          <input
            type="text"
            placeholder="Search for a place..."
            className="bg-transparent text-white placeholder-[#86959E] focus:outline-none flex-grow ml-2"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
          />
        </form>

        <button
          onClick={handleSearch}
          disabled={loading || !searchValue.trim()}
          className="bg-[#4658D9] max-sm:w-full text-white px-7 py-3 rounded-xl font-semibold hover:bg-[#3d4bbd] focus:outline-none focus:ring-2 focus:ring-[#4658D9] focus:ring-opacity-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
    </div>
  );
};

export default SearchOption;
