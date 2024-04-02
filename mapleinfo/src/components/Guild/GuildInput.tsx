import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { worldTypes } from "./constants";
import downArrow from "assets/downarrow.svg";

interface GuildInputProps {
  worldName?: string;
  guildName?: string;
}

const GuildInput = ({ worldName, guildName }: GuildInputProps) => {
  const [selectedWolrd, setSelectedWolrd] = useState<string>(
    worldName as string
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [guildInput, setGuildInput] = useState<string>(guildName as string);
  const navigate = useNavigate();

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

  return (
    <div className="relative bg-dark-200 p-2 mt-2 max-w-[400px] rounded-sm">
      <div className="flex items-center text-[13px] gap-x-2">
        <div className="w-[80px]">
          <button
            className="flex justify-between items-center w-full"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="text-[14px]">{selectedWolrd}</span>
            <img src={downArrow} alt="down_arrow" className="w-4 h-4" />
            <div className="absolute top-[100%] left-0 z-10 bg-dark-200 w-[90px]">
              {isOpen &&
                worldTypes.map((item, index) => (
                  <div
                    key={index}
                    className=" px-2 py-1 hover:bg-dark-100"
                    onClick={() => {
                      setSelectedWolrd(item);
                      setIsOpen(!isOpen);
                    }}
                  >
                    {item}
                  </div>
                ))}
            </div>
          </button>
        </div>
        <input
          placeholder="길드명을 입력하세요"
          type="text"
          value={guildInput}
          className="w-[280px]"
          onChange={handleGuildInput}
          onKeyUp={handleGuildKeyUp}
        />
      </div>
    </div>
  );
};

export default GuildInput;
