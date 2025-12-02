import React, { useEffect, useState } from "react";

import BannerComponent from "../components/banner.component";
import Header from "../components/header.component";

import { fetchValues } from "../api/values";
import { Value } from "../model/value.d";

import "../styles/home.css";

const Home: React.FC = () => {
  const [values, setValues] = useState<Value[]>([]);

  useEffect(() => {
    const getData = async () => {
      const fetchedValues = await fetchValues();
      setValues(fetchedValues);
    };
    getData();
  }, []);

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