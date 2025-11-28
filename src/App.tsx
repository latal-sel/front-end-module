import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./pages/Header";

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default App;