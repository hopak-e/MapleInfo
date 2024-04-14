import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchInput from "../inputs/SearchInput";
import { useSelector } from "react-redux";
import { RootState } from "modules/index";
import Star from "assets/star.svg";
import { ListOfFavorite } from "types/char";
import MainSuroRanking from "./MainSuroRanking";
import MainUserRanking from "./MainUserRanking";
import MainReabootRanking from "./MainRebootRanking";

const Main = () => {
  const isDark = useSelector((state: RootState) => state.dark.isDark);
  const [listOfFavorite, setListOfFavorite] = useState<ListOfFavorite[]>();

  useEffect(() => {
    const favorites = localStorage.getItem("listOfFavorite");
    if (favorites) {
      setListOfFavorite(JSON.parse(favorites));
    }
  }, []);

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
              <div className="flex gap-x-2 bg-white dark:bg-dark-250 text-[12px] p-1.5 rounded-md items-center">
                <div className="flex items-center pr-2 border-r gap-x-0.5">
                  <img src={Star} alt="star" className="w-4 h-4" />
                  <span>즐겨찾기</span>
                </div>
                {listOfFavorite &&
                  listOfFavorite.map((favorites, index) => (
                    <Link to={`char/${favorites.charName}`}>
                      <div
                        className="bg-dark-200 p-1 cursor-pointer rounded-lg"
                        key={index}
                      >
                        <span>{favorites.charName}</span>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
          <div className="max-w-[1120px] mx-auto my-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 font-[700]">
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
