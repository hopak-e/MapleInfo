import SearchInput from "../inputs/SearchInput";
import { useSelector } from "react-redux";
import { RootState } from "modules/index";
import MainSuroRanking from "./MainSuroRanking";
import MainUserRanking from "./MainUserRanking";
import MainReabootRanking from "./MainRebootRanking";
import Favorite from "components/Favorite/Favorite";

const Main = () => {
  const isDark = useSelector((state: RootState) => state.dark.isDark);

  return (
    <div className="grow">
      <div className="max-w-screen mx-auto grow">
        <div>
          <div className="bg-wallpaper bg-cover relative py-16">
            <div className="flex flex-col items-center gap-y-4">
              <div className="flex items-center text-white text-5xl font-[700]">
                MapleInfo
              </div>
              <SearchInput
                placeholder="닉네임을 입력하세요"
                width={`max-w-[680px]`}
                isDark={isDark}
              />
              <Favorite />
            </div>
          </div>
          <div className="max-w-[1120px] mx-auto my-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 font-[700] px-4">
              <MainUserRanking />
              <MainReabootRanking />
              <MainSuroRanking />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
