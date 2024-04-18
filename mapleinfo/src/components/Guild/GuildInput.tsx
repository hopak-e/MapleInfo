import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { worldTypes } from "./constants";
import downArrow from "assets/downarrow.svg";
import { useSelector } from "react-redux";
import { RootState } from "modules/index";
import DarkModeSearch from "assets/darkLightMode/darkModeSearch.svg";
import LightModeSearch from "assets/darkLightMode/lightModeSearch.svg";
import useOutsideClick from "hooks/useOutsideClick";
interface GuildInputProps {
  worldName?: string;
  guildName?: string;
}

const GuildInput = ({ worldName, guildName }: GuildInputProps) => {
  const navigate = useNavigate();
  const isDark = useSelector((state: RootState) => state.dark.isDark);
  const [selectedWolrd, setSelectedWolrd] = useState<string>(
    worldName as string
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [guildInput, setGuildInput] = useState<string>(guildName as string);

  const handleGuildInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuildInput(e.target.value);
  };

  const handleGuildSearch = () => {
    navigate(
      `/guild/${encodeURIComponent(selectedWolrd)}/${encodeURIComponent(
        guildInput
      )}`
    );
  };

  const handleGuildKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleGuildSearch();
    }
  };

  const listRef = useRef<HTMLDivElement>(null);
  useOutsideClick(listRef, () => setIsOpen(false));

  return (
    <div className="relative border border-dark-150 dark:border-none dark:bg-dark-200 p-2 mt-2 max-w-[400px] rounded-sm">
      <div className="flex items-center text-[13px] gap-x-2">
        <div ref={listRef} className="w-[80px]">
          <button
            className="flex justify-between items-center w-full"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="text-[14px]">{selectedWolrd}</span>
            <img src={downArrow} alt="down_arrow" className="w-4 h-4" />
            {isOpen && (
              <div className="absolute top-[100%] left-0 z-10 border border-dark-150 bg-white dark:bg-dark-200 w-[90px]">
                {worldTypes.map((item, index) => (
                  <div
                    key={index}
                    className=" px-2 py-1 hover:bg-dark-300 dark:hover:bg-dark-100"
                    onClick={() => {
                      setSelectedWolrd(item);
                      setIsOpen(!isOpen);
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </button>
        </div>
        <div className="relative flex">
          <input
            placeholder="길드명을 입력하세요"
            type="text"
            value={guildInput}
            className="w-[280px]"
            onChange={handleGuildInput}
            onKeyUp={handleGuildKeyUp}
          />
          <div>
            <img
              src={isDark ? DarkModeSearch : LightModeSearch}
              alt="searchIcon"
              className="w-6 h-6"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuildInput;
