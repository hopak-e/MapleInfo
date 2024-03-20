import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Header from "../features/Header";
const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <nav>
        <Link to="/" className="text-2xl font-bold">
          메인
        </Link>
        <Link to="/guild" className="text-2xl font-bold">
          길드
        </Link>
        <Link to="/ranking" className="text-2xl font-bold">
          랭킹
        </Link>
      </nav>
    </div>
  );
};

export default Home;
