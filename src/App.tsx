import React, { useEffect } from "react";
import { HashRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

import PortfolioPage from "./pages/PortfolioPage";
import ResumePage from "./pages/ResumePage";

const ScrollToTopHelper: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <ReactLenis root>
      <Router>
        <ScrollToTopHelper />
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

