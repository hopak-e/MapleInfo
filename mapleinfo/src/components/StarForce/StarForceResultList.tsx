import { useState, useEffect, useRef } from "react";
import { StarForceHistory } from "types/starforce";
import formatDate from "utils/dateUtils/formatDate";
import useOutsideClick from "hooks/useOutsideClick";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.module.css";
import DownArrow from "assets/downarrow.svg";
import filterHistory from "utils/filterHistory";

interface StarForceResultListProps {
  starForceHistory: StarForceHistory[];
  startDate: Date;
  endDate: Date;
  itemList: string[] | undefined;
  characterList: string[] | undefined;
  handleStartDateChange: (arg: Date) => void;
  handleEndDateChange: (arg: Date) => void;
}

const StarForceResultList = ({
  starForceHistory,
  startDate,
  endDate,
  itemList,
  characterList,
  handleStartDateChange,
  handleEndDateChange,
}: StarForceResultListProps) => {
  const [visibleCount, setVisibleCount] = useState(100);
  const [filteredStarForceHistory, setFilteredStarForceHistory] = useState<
    StarForceHistory[] | null
  >(starForceHistory);

  const [isItemListOpen, setIsItemListOpen] = useState<boolean>(false);
  const [isCharacterListOpen, setIsCharacterListOpen] =
    useState<boolean>(false);

  const [selectedItem, setSelectedItem] = useState<string>("모든 장비");
  const [selectedCharacter, setSelectedCharacter] =
    useState<string>("모든 캐릭터");

  const itemListRef = useRef<HTMLDivElement>(null);
  const characterListRef = useRef<HTMLDivElement>(null);

  useOutsideClick(itemListRef, () => setIsItemListOpen(false));
  useOutsideClick(characterListRef, () => setIsCharacterListOpen(false));

  useEffect(() => {
    filterHistory(
      selectedItem,
      selectedCharacter,
      starForceHistory,
      setFilteredStarForceHistory
    );
  }, [selectedItem, selectedCharacter, starForceHistory]);

  const handleItemListClick = (item: string) => {
    setSelectedItem(item);
    setIsItemListOpen(false);
  };
  const handleCharacterListClick = (character: string) => {
    setSelectedCharacter(character);
    setIsCharacterListOpen(false);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 100);
  };

  return (
    <div className="grow shrink border-[0.5px] border-dark-150 dark:border-none dark:bg-dark-50 p-2 rounded-sm">
      <div className="flex items-center justify-between w-full pb-2 border-b">
        <div>
          <span>강화내역</span>
          <span>{`(${
            filteredStarForceHistory && filteredStarForceHistory.length > 0
              ? filteredStarForceHistory.length
              : starForceHistory.length
          }건)`}</span>
        </div>
        <div className="flex items-center text-[11px] md:text-[12px]">
          <div className="mr-2">
            <label htmlFor="start-date">시작일 : </label>
            <DatePicker
              id="start-date"
              selected={startDate}
              onChange={handleStartDateChange}
              selectsStart
              startDate={startDate}
              dateFormat="yyyy-MM-dd"
              placeholderText="시작일"
              className="w-[80px] border pl-1 pt-0.5 cursor-pointer rounded-md"
            />
          </div>
          <div>
            <label htmlFor="end-date">종료일 : </label>
            <DatePicker
              id="end-date"
              selected={endDate}
              onChange={handleEndDateChange}
              selectsEnd
              endDate={new Date()}
              minDate={startDate}
              dateFormat="yyyy-MM-dd"
              placeholderText="종료일"
              className="w-[80px] border pl-1 pt-0.5 cursor-pointer rounded-md"
            />
          </div>
        </div>
      </div>
      <div className="flex gap-x-2 text-[12px] mt-2">
        <div
          ref={itemListRef}
          className="relative flex items-center gap-x-2 px-2 py-1 border rounded-sm shadow-md cursor-pointer dark:bg-dark-200"
          onClick={() => setIsItemListOpen(!isItemListOpen)}
        >
          <button>{selectedItem}</button>
          <img src={DownArrow} alt="downarrow" className="w-4 h-4" />
          {isItemListOpen && (
            <ul className="absolute w-[160px] max-h-[200px] top-[100%] left-[-10%] overflow-y-auto z-10 border border-dark-150 dark:border-none bg-white dark:bg-dark-200 shadow-md">
              {itemList &&
                itemList.map((item, index) => (
                  <li
                    key={index}
                    className="py-1 pl-2 hover:bg-dark-300 dark:hover:bg-dark-150"
                    onClick={() => handleItemListClick(item)}
                  >
                    {item}
                  </li>
                ))}
            </ul>
          )}
        </div>
        <div
          ref={characterListRef}
          className="relative flex items-center gap-x-2 px-2 py-1 border rounded-sm shadow-md cursor-pointer dark:bg-dark-200"
          onClick={() => setIsCharacterListOpen(!isCharacterListOpen)}
        >
          <button>{selectedCharacter}</button>
          <img src={DownArrow} alt="downarrow" className="w-4 h-4" />
          {isCharacterListOpen && (
            <ul className="absolute w-[160px] max-h-[200px] top-[100%] left-[-10%] overflow-y-auto z-10  border border-dark-150 dark:border-none bg-white dark:bg-dark-200 shadow-md">
              {characterList &&
                characterList.map((char, index) => (
                  <li
                    key={index}
                    className="py-1 pl-2 hover:bg-dark-300 dark:hover:bg-dark-150"
                    onClick={() => handleCharacterListClick(char)}
                  >
                    {char}
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-y-2 text-[11px] md:text-[12px] mt-2">
        {filteredStarForceHistory &&
          filteredStarForceHistory.slice(0, visibleCount).map(
            (history) =>
              history.before_starforce_count > 12 && (
                <div
                  key={history.id}
                  className={`flex items-center p-2 ${
                    history.item_upgrade_result === "성공"
                      ? "bg-starforceresult-200 dark:bg-starforceresult-50"
                      : history.item_upgrade_result === "파괴"
                      ? "bg-starforceresult-150"
                      : "bg-starforceresult-250 dark:bg-starforceresult-100"
                  } bg-dark-200 shadow-md`}
                >
                  <div className="flex-1">
                    <div>{history.item_upgrade_result}</div>
                    <div className="text-[14px] md:text-[16px] font-[500]">{`${history.before_starforce_count} → ${history.after_starforce_count}`}</div>
                    <div className="flex gap-x-2">
                      {history.starcatch_result === "성공" && (
                        <div>스타캐치</div>
                      )}
                      {history.destroy_defence === "파괴 방지 적용" && (
                        <div>파괴방지</div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="text-[14px] md:text-[16px] font-[600]">
                      {history.target_item}
                    </div>
                    <div>
                      <span>{history.world_name}</span>
                      <span>{` / ${history.character_name}`}</span>
                    </div>
                  </div>
                  <div className="flex-1 text-right">
                    <div>{formatDate(new Date(history.date_create))}</div>
                  </div>
                </div>
              )
          )}
        {filteredStarForceHistory &&
          visibleCount < filteredStarForceHistory.length && (
            <button
              onClick={handleLoadMore}
              className="cursor-pointer hover:bg-dark-300 dark:hover:bg-dark-150"
            >
              더보기
            </button>
          )}
      </div>
    </div>
  );
};

export default StarForceResultList;
