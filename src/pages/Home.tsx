import React from "react";

import BannerComponent from "../components/banner.component";
import Header from "../components/header.component";
import NetworkConfigComponent from "../components/network-config.component";

import "../styles/home.css";

const Home: React.FC = () => {
  const [showNetworkConfig, setShowNetworkConfig] = React.useState(false);

  const toggleNetworkConfig = () => {
    setShowNetworkConfig(!showNetworkConfig);
  };

  return (
    <>
      <Header onConfigClick={toggleNetworkConfig} />
      <div className="banner-div">
        <BannerComponent type="warning"/>
        <BannerComponent type="disconnected"/>
      </div>
      {showNetworkConfig && <NetworkConfigComponent onConfigClick={toggleNetworkConfig} />}
    </>
  );
};

export default Home;