import React from "react";

import BannerComponent from "../components/banner.component";
import Header from "../components/Header";

import "../styles/home.css";

const Home: React.FC = () => {

  return (
    <div>
      <Header />
      <div className="banner-div">
        
        <BannerComponent type="warning"/>
        <BannerComponent type="disconnected"/>
      </div>
    </div>
  );
};

export default Home;