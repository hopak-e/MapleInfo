import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage";
import StarForcePage from "pages/StarForcePage";
import Cube from "pages/CubePage";
import CharPage from "pages/CharPage";
import GuildPage from "pages/GuildPage";
import GuildDetailPage from "pages/GuildDetailPage";
import TrackCharPage from "pages/TrackCharPage";

function App() {
  useEffect(() => {
    const favorite = localStorage.getItem("listOfFavorite");
    if (!favorite) {
      const data = [{ charName: "호팍팍팍팍" }, { charName: "아델" }];
      localStorage.setItem("listOfFavorite", JSON.stringify(data));
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen dark:bg-dark-50 dark:text-white">
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/cube" element={<Cube />}></Route>
        <Route path="/starforce" element={<StarForcePage />}></Route>
        <Route path="/char/:nickName" element={<CharPage />} />
        <Route path="/guild" element={<GuildPage />}></Route>
        <Route path="/guild/:worldName/:guildName" element={<GuildPage />} />
        <Route
          path="/guildDetail/:worldName/:guildName"
          element={<GuildDetailPage />}
        />
        <Route path="/trackChar" element={<TrackCharPage />} />
        <Route path="/trackChar/:nickName" element={<TrackCharPage />} />
      </Routes>
    </div>
  );
}

export default App;
