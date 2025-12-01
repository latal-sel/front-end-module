import React, { useEffect, useState } from "react";

import BannerComponent from "../components/banner.component";
import Header from "../components/header.component";
import RestartComponent from "../components/restart.component";
import NetworkConfigComponent from "../components/network-config.component";

import { fetchValues } from "../api/values";
import { Value } from "../model/value.d";

import "../styles/home.css";

const Home: React.FC = () => {
  const [values, setValues] = useState<Value[]>([]);
  const [showNetworkConfig, setShowNetworkConfig] = React.useState(false);
  const [showRestart, setShowRestart] = React.useState(false);

  useEffect(() => {
    const getData = async () => {
      const fetchedValues = await fetchValues();
      setValues(fetchedValues);
    };
    getData();
  }, []);

  const toggleNetworkConfig = () => {
    setShowNetworkConfig(!showNetworkConfig);
  };

  const toggleRestart = () => {
    setShowRestart(!showRestart);
  };

  return (
    <>
      <Header onConfigClick={toggleNetworkConfig} onRestartClick={toggleRestart} />
      <div className="banner-div">
        {values.map((value, index) => (
          <BannerComponent key={index} value={value} />
        ))}
      </div>
      {showNetworkConfig && <NetworkConfigComponent onConfigClick={toggleNetworkConfig} />}
      {showRestart && <RestartComponent onRestartClick={toggleRestart} />}
    </>
  );
};

export default Home;