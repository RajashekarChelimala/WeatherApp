import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import bgImage from "./Images/bg.jpg";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Content from "./Components/Content";

function App() {
  return (
    <>
      <Header />
      <Content />
      <Footer />
    </>
  );
}

export default App;
