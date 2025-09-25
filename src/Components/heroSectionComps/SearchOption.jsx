import React from "react";
import searchIcon from "../../assets/icons/search.svg";
import { useState } from "react";

const SearchOption = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", searchValue);
  };

  return (
    <div className="flex items-center space-x-2 w-full max-w-lg mx-auto ">
      <div className="flex items-center space-x-2 px-4 py-3 rounded-xl bg-[#2A3140] flex-grow">
        <img src={searchIcon} alt="search" />
        <input
          type="text"
          placeholder="Search for a place..."
          className="bg-transparent text-white placeholder-[#86959E] focus:outline-none flex-grow"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <button
        onClick={handleSearch}
        className="bg-[#4658D9] text-white px-7 py-3 rounded-xl font-semibold hover:bg-[#3d4bbd] focus:outline-none focus:ring-2 focus:ring-[#4658D9] focus:ring-opacity-50 transition-colors duration-200"
      >
        Search
      </button>
    </div>
  );
};

export default SearchOption;
