import React from "react";

import BannerComponent from "../components/banner.component";
import NetworkConfigComponent from "../components/network-config.component";

import "../styles/home.css";

const Home: React.FC = () => {

  return (
    <>
      <div className="banner-div">
        <BannerComponent type="warning"/>
        <BannerComponent type="disconnected"/>
      </div>
      <NetworkConfigComponent />
    </>
  );
};

export default Home;