import React, { useState } from "react";
import "./App.css";
import Home from "./components/home/home";
import { Navigate, Route, Routes } from "react-router-dom";
import Banks from "./components/banksList/banks";

function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const setCoords = (latitude:number,longitude:number) => {
    setLatitude(latitude);
    setLongitude(longitude);
  };
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/home"></Navigate>} />
        <Route path="/home" element={<Home setCoords={setCoords} />} />
        <Route path="/banks" element={<Banks />} />
      </Routes>
    </div>
  );
}

export default App;
