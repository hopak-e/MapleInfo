import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage";
import StarForcePage from "pages/StarForcePage";
import CubePage from "pages/CubePage";
import CharPage from "pages/CharPage";
import GuildPage from "pages/GuildPage";
import GuildDetailPage from "pages/GuildDetailPage";
import TrackCharPage from "pages/TrackCharPage";
import HelpPage from "pages/HelpPage";
import Footer from "components/Footer/Footer";

function App() {
  useEffect(() => {
    const apiKey = localStorage.getItem("api-key");
    if (!apiKey) {
      const data = `${process.env.REACT_APP_API_KEY}`;
      localStorage.setItem("api-key", JSON.stringify(data));
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen dark:bg-dark-50 dark:text-white">
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/cube" element={<CubePage />}></Route>
        <Route path="/cube/:result" element={<CubePage />}></Route>
        <Route path="/starforce" element={<StarForcePage />}></Route>
        <Route path="/starforce/:result" element={<StarForcePage />}></Route>
        <Route path="/char/:nickName" element={<CharPage />} />
        <Route path="/guild" element={<GuildPage />}></Route>
        <Route path="/guild/:worldName/:guildName" element={<GuildPage />} />
        <Route
          path="/guildDetail/:worldName/:guildName"
          element={<GuildDetailPage />}
        />
        <Route path="/trackChar" element={<TrackCharPage />} />
        <Route path="/trackChar/:nickName" element={<TrackCharPage />} />
        <Route path="/help" element={<HelpPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
