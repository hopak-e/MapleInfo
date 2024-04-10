import { useEffect, useRef, useState } from "react";
import { CubeHistory } from "types/cube";
import filterHistory from "utils/filterHistory";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.module.css";
import useOutsideClick from "hooks/useOutsideClick";
import DownArrow from "assets/downarrow.svg";
import formatDate from "utils/formatDate";

interface CubeResultListProps {
  cubeHistory: CubeHistory[];
  startDate: Date;
  endDate: Date;
  equipList: string[] | undefined;
  characterList: string[] | undefined;
  handleStartDateChange: (arg: Date) => void;
  handleEndDateChange: (arg: Date) => void;
}

const CubeResultList = ({
  cubeHistory,
  startDate,
  endDate,
  equipList,
  characterList,
  handleStartDateChange,
  handleEndDateChange,
}: CubeResultListProps) => {
  const [visibleCount, setVisibleCount] = useState(100);
  const [filteredCubeHistory, setFilteredCubeHistory] = useState<
    CubeHistory[] | null
  >(cubeHistory);

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
      cubeHistory,
      setFilteredCubeHistory
    );
  }, [selectedItem, selectedCharacter, cubeHistory]);

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
  console.log(filteredCubeHistory);
  return (
    <div className="grow shrink bg-dark-50">
      <div className="px-2 py-1">
        <div className="flex justify-between py-2 border-b">
          <div>{`재설정 내역 (${
            filteredCubeHistory && filteredCubeHistory.length > 0
              ? filteredCubeHistory.length
              : cubeHistory.length
          }건)`}</div>
          <div>
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
                  className="w-[85px] border px-1 py-0.5 cursor-pointer"
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
                  className="w-[85px] border px-1 py-0.5 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-x-2 text-[12px]">
          <div
            ref={itemListRef}
            className="relative flex items-center gap-x-2 px-2 py-1 border rounded-sm cursor-pointer"
            onClick={() => setIsItemListOpen(!isItemListOpen)}
          >
            <button>{selectedItem}</button>
            <img src={DownArrow} alt="downarrow" className="w-4 h-4" />
            {isItemListOpen && (
              <ul className="absolute w-[160px] h-[200px] top-[100%] left-[-10%] overflow-y-auto z-10 bg-dark-200">
                {equipList &&
                  equipList.map((item, index) => (
                    <li
                      key={index}
                      className="py-1 pl-2 hover:bg-dark-150"
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
            className="relative flex items-center gap-x-2 px-2 py-1 border rounded-sm cursor-pointer"
            onClick={() => setIsCharacterListOpen(!isCharacterListOpen)}
          >
            <button>{selectedCharacter}</button>
            <img src={DownArrow} alt="downarrow" className="w-4 h-4" />
            {isCharacterListOpen && (
              <ul className="absolute w-[160px] h-[200px] top-[100%] left-[-10%] overflow-y-auto z-10 bg-dark-200">
                {characterList &&
                  characterList.map((char, index) => (
                    <li
                      key={index}
                      className="py-1 pl-2 hover:bg-dark-150"
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
          {filteredCubeHistory &&
            filteredCubeHistory.slice(0, visibleCount).map((history) => (
              <div
                key={history.id}
                className={`flex items-center p-2 ${
                  history.item_upgrade_result === "성공" &&
                  "bg-starforce-success"
                } bg-dark-200`}
              >
                <div className="flex-1">
                  <div>{history.potential_type}</div>
                  <div className="text-[14px] md:text-[16px] font-[500]">
                    {history.target_item}
                  </div>
                  <div className="flex"></div>
                </div>
                <div className="flex-1 text-center">
                  <div>
                    {history.potential_type === "잠재능력 재설정"
                      ? "잠재옵션"
                      : "에디옵션"}
                  </div>
                  {history.potential_type === "잠재능력 재설정"
                    ? history.before_potential_option.map((option, index) => (
                        <div
                          key={index}
                          className={`text-potential-${option.grade}`}
                        >
                          {option.value}
                        </div>
                      ))
                    : history.before_additional_potential_option.map(
                        (option, index) => (
                          <div
                            key={index}
                            className={`text-potential-${option.grade}`}
                          >
                            {option.value}
                          </div>
                        )
                      )}
                </div>
                <div className="flex-1 text-center">
                  <div>
                    {history.potential_type === "잠재능력 재설정"
                      ? "잠재옵션"
                      : "에디옵션"}
                  </div>
                  {history.potential_type === "잠재능력 재설정"
                    ? history.after_potential_option.map((option, index) => (
                        <div
                          key={index}
                          className={`text-potential-${option.grade}`}
                        >
                          {option.value}
                        </div>
                      ))
                    : history.after_additional_potential_option.map(
                        (option, index) => (
                          <div
                            key={index}
                            className={`text-potential-${option.grade}`}
                          >
                            {option.value}
                          </div>
                        )
                      )}
                </div>
                <div className="flex-1 text-right">
                  <div>{formatDate(new Date(history.date_create))}</div>
                  <div>{history.character_name}</div>
                </div>
              </div>
            ))}

          {filteredCubeHistory && visibleCount < filteredCubeHistory.length && (
            <button
              onClick={handleLoadMore}
              className="cursor-pointer hover:bg-dark-150"
            >
              더보기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CubeResultList;
