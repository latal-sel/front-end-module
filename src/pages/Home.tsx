import React, { useState } from "react";
import { fetchValues, type Value } from "../api/values";

const Home: React.FC = () => {
  const [message, setMessage] = useState("Bonjour depuis Home!");

  return (
    <div>
      <h1>Home Page</h1>
      <p>{message}</p>
      <button onClick={async () => {
        const values: Value[] = await fetchValues();
        setMessage(`Fetched ${values.length} values from API.`);
      }}>
        Envoyer une requête API
      </button>
    </div>
  );
};

export default Home;