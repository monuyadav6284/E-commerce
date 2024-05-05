import React from "react";
import "./App.css";
import {} from "antd";

import AppHeader from "./Components/Header/index";
import PageContent from "./Components/PageContent/index";
import Footer from "./Components/Footer/index";
import { BrowserRouter } from "react-router-dom";
const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <AppHeader />
        <PageContent />
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
