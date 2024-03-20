import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/pages/Home";
import Guild from "./components/pages/Guild";
import Ranking from "./components/pages/Ranking";
import Header from "./components/features/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/guild" element={<Guild />}></Route>
        <Route path="/ranking" element={<Ranking />}></Route>
      </Routes>
    </div>
  );
}

export default App;
