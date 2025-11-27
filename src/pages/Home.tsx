import React from "react";

import BannerComponent from "../components/banner.component";

import "../styles/home.css";

const Home: React.FC = () => {

  return (
    <div className="banner-div">
      <BannerComponent type="warning"/>
      <BannerComponent type="disconnected"/>
    </div>
  );
};

export default Home;