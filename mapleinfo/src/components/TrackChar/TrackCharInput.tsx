import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DarkSearchIcon from "assets/darkLightMode/darkModeSearch.svg";
import LightSearchIcon from "assets/darkLightMode/lightModeSearch.svg";
import { useSelector } from "react-redux";
import { RootState } from "modules/index";

const TrackCharInput = () => {
  const [nickName, setNickName] = useState<string>("");
  const navigate = useNavigate();
  const isDark = useSelector((state: RootState) => state.dark.isDark);

  const handleNickNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };

  const handleNickNameSearch = () => {
    navigate(`/trackChar/${encodeURIComponent(nickName)}`);
  };

  const handleNicknameKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleNickNameSearch();
    }
  };

  const handleSearchClick = () => {
    handleNickNameSearch();
  };

  return (
    <div className="relative border border-dark-150 dark:border-none dark:bg-dark-200 p-2 mt-2 max-w-[400px] rounded-sm">
      <div className="flex items-center text-[13px] gap-x-2">
        <input
          placeholder="닉네임을 입력하세요"
          type="text"
          value={nickName}
          className="w-[280px]"
          onChange={handleNickNameInput}
          onKeyUp={handleNicknameKeyUp}
        />
        <div className="cursor-pointer" onClick={handleSearchClick}>
          <img
            src={isDark ? DarkSearchIcon : LightSearchIcon}
            alt="searchIcon"
            className="w-6 h-6"
          />
        </div>
      </div>
    </div>
  );
};

export default TrackCharInput;
