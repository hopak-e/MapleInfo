import { Link } from "react-router-dom";
import SearchInput from "../inputs/SearchInput";

const Home = () => {
  return (
    <div className="w-screen h-[calc(100vh-9rem)]">
      <div className="bg-wallpaper bg-cover w-full h-full relative">
        <div className="flex flex-col py-32 items-center">
          <div className="flex items-center text-white text-4xl h-24">
            MapleInfo
          </div>
          <SearchInput placeholder="닉네임을 입력하세요" width="w-1/2" />
          <Link to="char">
            <div className="flex">캐릭터창</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
