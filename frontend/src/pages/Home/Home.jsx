import React from "react";
import { Footer } from "../../components/Footer/Footer";
import { HeroSection } from "./components/HeroSection/HeroSection";
import { CategoriesSection } from "./components/CategoriesSection/CategoriesSection";
import { VideosSection } from "./components/VideosSection/VideosSection";
import { HeroVideo } from "./components/HeroVideo/HeroVideo";
import { useData } from "../../contexts/DataProvider";
import HeaderStrip from "./components/HeaderStrip";

export const Home = () => {
  const { loading } = useData();
  return (
    !loading && (
      <div className="home-page">
        <div className="hero">
          <HeaderStrip />
          <HeroVideo />
          <HeroSection />
          <VideosSection />
          <CategoriesSection />
          <Footer />
        </div>
      </div>
    )
  );
};
