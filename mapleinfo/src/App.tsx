import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/HomePage";
import Guild from "./pages/GuildPage";
import Ranking from "./pages/Ranking";
import Header from "./components/Header/Header";
import StarForce from "components/StarForce/StarForce";
import MainChar from "./pages/MainChar";
import Calc from "./pages/Calc";
import Cube from "./pages/Cube";
import Char from "./pages/CharPage";
import CharPage from "./pages/CharPage";
import GuildPage from "./pages/GuildPage";
import GuildDetail from "components/Guild/GuildDetail";
import TrackChar from "components/TrackChar/TrackChar";
import TrackedChar from "components/TrackChar/TrackedChar";

function App() {
  return (
    <div className="flex flex-col min-h-screen dark:bg-dark-50 dark:text-white">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/guild" element={<Guild />}></Route>
        <Route path="/ranking" element={<Ranking />}></Route>
        <Route path="/cube" element={<Cube />}></Route>
        <Route path="/starforce" element={<StarForce />}></Route>
        <Route path="/mainchar" element={<MainChar />}></Route>
        <Route path="/calc" element={<Calc />}></Route>
        <Route path="/char" element={<Char />}></Route>
        <Route path="/char/:value" element={<CharPage />} />
        <Route path="/guild/:worldName/:guildName" element={<GuildPage />} />
        <Route
          path="/guildDetail/:worldName/:guildName"
          element={<GuildDetail />}
        />
        <Route path="/trackChar/" element={<TrackChar />} />
        <Route path="/trackChar/:nickName" element={<TrackedChar />} />
      </Routes>
    </div>
  );
}

export default App;
