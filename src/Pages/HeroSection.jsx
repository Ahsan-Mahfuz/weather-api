import React from "react";
import Header from "../Components/heroSectionComps/Header";
import Title from "../Components/heroSectionComps/Title";
import SearchOption from "../Components/heroSectionComps/SearchOption";
import SomethingWentWrong from "../Components/ErrorComps/SomethingWentWrong";

const HeroSection = () => {
  return (
    <div>
      <Header />
      <Title />
      <SearchOption />
    </div>
  );
};

export default HeroSection;
