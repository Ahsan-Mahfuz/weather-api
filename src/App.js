import { WeatherProvider } from "./contexts/WeatherContext";
import HeroSection from "./Pages/HeroSection";

const App = () => {
  return (
    <WeatherProvider>
      <HeroSection />
    </WeatherProvider>
  );
};

export default App;
