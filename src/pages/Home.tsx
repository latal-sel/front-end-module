import React, { useEffect, useState } from "react";

import BannerComponent from "../components/banner.component";
import Header from "../components/header.component";
import NetworkConfigComponent from "../components/network-config.component";

import { fetchValues } from "../api/values";
import { Value } from "../model/value.d";

import "../styles/home.css";

const Home: React.FC = () => {
  const [values, setValues] = useState<Value[]>([]);
  const [showNetworkConfig, setShowNetworkConfig] = React.useState(false);

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

  return (
    <>
      <Header onConfigClick={toggleNetworkConfig} />
      <div className="banner-div">
        {values.map((value, index) => (
          <BannerComponent key={index} value={value} />
        ))}
      </div>
      {showNetworkConfig && <NetworkConfigComponent onConfigClick={toggleNetworkConfig} />}
    </>
  );
};

export default Home;