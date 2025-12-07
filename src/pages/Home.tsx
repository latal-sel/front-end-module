import React, { useEffect, useState } from "react";

import BannerComponent from "../components/banner.component";
import Header from "../components/header.component";

import { fetchValues } from "../api/values";
import { Value } from "../model/value.d";

import "../styles/home.css";
import { websocketClient } from "../utils/websocket";

const Home: React.FC = () => {
  const [values, setValues] = useState<Value[]>([]);

  useEffect(() => {
    const getData = async () => {
      const fetchedValues = await fetchValues();
      setValues(fetchedValues);
    };
    getData();
  }, []);

  useEffect(() => {
    console.log("Setting up WebSocket connection");
    websocketClient.connect();

    websocketClient.on((data: string) => {
      console.log("Received data via WebSocket:", data);
    });
  });

  const toggleNetworkConfig = () => {
    setShowNetworkConfig(!showNetworkConfig);
  };

  const toggleRestart = () => {
    setShowRestart(!showRestart);
  };

  return (
    <>
      <Header />
      <div className="banner-div">
        {values.map((value, index) => (
          <BannerComponent key={index} value={value} />
        ))}
      </div>
    </>
  );
};

export default Home;