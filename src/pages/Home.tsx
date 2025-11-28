import React from "react";

import BannerComponent from "../components/banner.component";
import Header from "../components/Header";
import NetworkConfigComponent from "../components/network-config.component";

import "../styles/home.css";

const Home: React.FC = () => {

  return (
    <>
      <Header />
      <div className="banner-div">
        <BannerComponent type="warning"/>
        <BannerComponent type="disconnected"/>
      </div>
      <NetworkConfigComponent />
    </>
  );
};

export default Home;