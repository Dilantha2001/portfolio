import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

import PortfolioPage from "./pages/PortfolioPage";
import ResumePage from "./pages/ResumePage";


const App: React.FC = () => {
  return (
    <ReactLenis root>
      <Router>
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<PortfolioPage />} />
            <Route path="/resume" element={<ResumePage />} />
          </Routes>
        </div>
      </Router>
    </ReactLenis>
  );
};

export default App;

