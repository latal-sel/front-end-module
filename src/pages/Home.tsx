import React, { useEffect, useState } from "react";

import BannerComponent from "../components/banner.component";
import Header from "../components/header.component";

import { Value } from "../model/value.d";

import "../styles/home.css";
import { websocketClient } from "../utils/websocket";

const Home: React.FC = () => {
  const [valuesM1, setValuesM1] = useState<Value[]>([]);
  const [valuesM3, setValuesM3] = useState<Value[]>([]);
  const [showNetworkConfig, setShowNetworkConfig] = React.useState(false);
  const [showRestart, setShowRestart] = React.useState(false);

  // If name exists in array, update value, else insert
  const insertValueIntoArray = (ValueToInsert: Value, ValueArray: Value[], setValues: React.Dispatch<React.SetStateAction<Value[]>>) => {
    const index = ValueArray.findIndex((v) => v.name === ValueToInsert.name);
    console.log("Index found: ", index);
    console.log("Value to insert: ", ValueToInsert);
    console.log("Current array: ", ValueArray);
    if (index !== -1) {
      const newArray = [...ValueArray];
      newArray[index] = ValueToInsert;
      setValues(newArray);
    } else {
      setValues((prevValues) => [...prevValues, ValueToInsert]);
    }
  }

  // Set up Websocket to receive data
  useEffect(() => {
    console.log("Setting up WebSocket connection");
    websocketClient.connect();

    websocketClient.on((data: Value) => {
      if(data.datatype != "variable_change")
        return;
      data.isSimulated = false;
      if (data.module === "M1")
        insertValueIntoArray(data, valuesM1, setValuesM1);
      else if (data.module === "M3") {
        insertValueIntoArray(data, valuesM3, setValuesM3);
      }
    });
  }, [valuesM1, valuesM3]);


  return (
    <>
      <Header onConfigClick={toggleNetworkConfig} onRestartClick={toggleRestart} />
      <div className="home-body">
        <div className="banner-div">
          <span>M1</span>
          {valuesM1.map((value, index) => (
            <BannerComponent key={index} value={value} />
          ))}
        </div>
        <div className="banner-div">
          <span>M3</span>
          {valuesM3.map((value, index) => (
            <BannerComponent key={index} value={value} />
          ))}
        </div>
      </div>

      {showNetworkConfig && <NetworkConfigComponent onConfigClick={toggleNetworkConfig} />}
      {showRestart && <RestartComponent onRestartClick={toggleRestart} />}
    </>
  );
};

export default Home;