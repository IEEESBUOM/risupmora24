import React from "react";
import HeroSection from "./HeroSection";
import About from "./About";
import Timeline from "./Timeline";
import Partners from "./Partners";
import CountactUs from "./CountactUs";
import Footer from "./Footer";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <About />
      <Timeline />
      <Partners />
      <CountactUs />
      <Footer />
    </div>
  );
};

export default HomePage;
