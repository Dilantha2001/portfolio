import type React from "react";
import ThemeProvider from "../components/ThemeProvider";
import { ScrollProgressBar } from "../components/shared/ScrollProgressBar";
import { Header } from "../components/shared/Header";
import { Resume } from "../components/resume/Resume";
import { Footer } from "../components/shared/Footer";

const ResumePage: React.FC = () => {
  return (
    <ThemeProvider>
      <ScrollProgressBar />
      <Header links={[]} />
      <main className="max-w-6xl lg:max-w-7xl mx-auto px-6 py-10 pt-25 print:max-w-none print:p-0">
        <Resume />
      </main>
      <Footer />
    </ThemeProvider>
  );
};

export default ResumePage;
