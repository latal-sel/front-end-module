import React, { useState } from "react";

const Home: React.FC = () => {
  const [message, setMessage] = useState("Bonjour depuis Home!");

  return (
    <div>
      <h1>Home Page</h1>
      <p>{message}</p>
      <button onClick={() => setMessage("Message modifié!")}>
        Modifier le message
      </button>
    </div>
  );
};

export default Home;