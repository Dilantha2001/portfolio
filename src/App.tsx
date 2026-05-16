import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import PortfolioPage from "./pages/PortfolioPage";
import ResumePage from "./pages/ResumePage";
import SplashCursor from "./components/SplashCursor";

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen scroll-smooth">
        <SplashCursor
          SIM_RESOLUTION={64}
          DYE_RESOLUTION={512}
          PRESSURE_ITERATIONS={10}
          DENSITY_DISSIPATION={5.5}
          VELOCITY_DISSIPATION={3}
          PRESSURE={0.1}
          CURL={2}
          SPLAT_RADIUS={0.02}
          SPLAT_FORCE={2500}
          COLOR_UPDATE_SPEED={10}
          SHADING={false}
          RAINBOW_MODE={false}
          COLOR="#A855F7"
        />
        <Routes>
          <Route path="/" element={<PortfolioPage />} />
          <Route path="/resume" element={<ResumePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
