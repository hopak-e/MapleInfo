import { useEffect, useRef, useState } from "react";
import { CubeHistory } from "types/cube";
import filterHistory from "utils/filterHistory";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.module.css";
import useOutsideClick from "hooks/useOutsideClick";
import DownArrow from "assets/downarrow.svg";
import formatDate from "utils/dateUtils/formatDate";
import gradeTransToEng from "utils/styleUtils/gradeTransToEng";
import gradeTextStyle from "utils/styleUtils/gradeTextStyle";

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

  return (
    <div className="grow shrink shadow-md dark:shadow-none border-[0.5px] border-dark-150 dark:border-none dark:bg-dark-50">
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
                  className="w-[80px] shadow-md dark:shadow-none border-[0.5px] px-1 pt-1 pb-0.5 cursor-pointer rounded-md"
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
                  className="w-[80px] shadow-md dark:shadow-none border-[0.5px] px-1 pt-1 pb-0.5 cursor-pointer rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-x-2 text-[12px] mt-3">
          <div
            ref={itemListRef}
            className="relative flex items-center gap-x-2 px-2 py-1 rounded-sm cursor-pointer shadow-md dark:shadow-none border-[0.5px] border-dark-150 dark:border-none dark:bg-dark-200"
            onClick={() => setIsItemListOpen(!isItemListOpen)}
          >
            <button>{selectedItem}</button>
            <img src={DownArrow} alt="downarrow" className="w-4 h-4" />
            {isItemListOpen && (
              <ul className="absolute w-[160px] max-h-[200px] top-[100%] left-[-10%] overflow-y-auto z-10 shadow-md dark:shadow-none border-[0.5px] border-dark-150 dark:border-none bg-white dark:bg-dark-200">
                {equipList &&
                  equipList.map((item, index) => (
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
            className="relative flex items-center gap-x-2 px-2 py-1 rounded-sm cursor-pointer shadow-md dark:shadow-none border-[0.5px] border-dark-150 dark:border-none dark:bg-dark-200"
            onClick={() => setIsCharacterListOpen(!isCharacterListOpen)}
          >
            <button>{selectedCharacter}</button>
            <img src={DownArrow} alt="downarrow" className="w-4 h-4" />
            {isCharacterListOpen && (
              <ul className="absolute w-[160px] max-h-[200px] top-[100%] left-[-10%] overflow-y-auto z-10 shadow-md dark:shadow-none border-[0.5px] border-dark-150 dark:border-none bg-white dark:bg-dark-200">
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
        <div className="flex flex-col gap-y-2 text-[10px] md:text-[12px] mt-2">
          {filteredCubeHistory &&
            filteredCubeHistory.slice(0, visibleCount).map((history) => (
              <div
                key={history.id}
                className={`grid grid-cols-[auto_1fr_1fr_auto] items-center p-2 ${
                  history.item_upgrade_result === "성공" &&
                  "bg-starforceresult-200 dark:bg-starforceresult-50"
                } dark:bg-dark-200 gap-x-1 shadow-md dark:shadow-none border-[0.5px] border-dark-150 dark:border-none`}
              >
                <div className="">
                  <div>{history.potential_type}</div>
                  <div className="text-[11px] md:text-[14px] font-[500]">
                    {history.target_item}
                  </div>
                </div>
                <div className="text-center text-[10px] md:text-[12px]">
                  <div className="flex justify-center items-center gap-x-0.5">
                    <img
                      src={
                        history.potential_type === "잠재능력 재설정"
                          ? require(`assets/grade/${gradeTransToEng(
                              history.before_potential_option[0].grade
                            )}.png`)
                          : require(`assets/grade/${gradeTransToEng(
                              history.before_additional_potential_option[0]
                                .grade
                            )}.png`)
                      }
                      alt="grade-img"
                      className="w-3 h-3 md:w-4 md:h-4"
                    />
                    <span>
                      {history.potential_type === "잠재능력 재설정"
                        ? "잠재옵션"
                        : "에디옵션"}
                    </span>
                  </div>
                  {history.potential_type === "잠재능력 재설정"
                    ? history.before_potential_option.map((option, index) => (
                        <div
                          key={index}
                          className={`${gradeTextStyle(option.grade)}`}
                        >
                          {option.value}
                        </div>
                      ))
                    : history.before_additional_potential_option.map(
                        (option, index) => (
                          <div
                            key={index}
                            className={`${gradeTextStyle(option.grade)}`}
                          >
                            {option.value}
                          </div>
                        )
                      )}
                </div>
                <div className="flex-1 text-center ">
                  <div className="flex justify-center items-center gap-x-0.5">
                    <img
                      src={
                        history.potential_type === "잠재능력 재설정"
                          ? require(`assets/grade/${gradeTransToEng(
                              history.after_potential_option[0].grade
                            )}.png`)
                          : require(`assets/grade/${gradeTransToEng(
                              history.after_additional_potential_option[0].grade
                            )}.png`)
                      }
                      alt="grade-img"
                      className="w-3 h-3 md:w-4 md:h-4"
                    />
                    <span>
                      {history.potential_type === "잠재능력 재설정"
                        ? "잠재옵션"
                        : "에디옵션"}
                    </span>
                  </div>
                  {history.potential_type === "잠재능력 재설정"
                    ? history.after_potential_option.map((option, index) => (
                        <div
                          key={index}
                          className={`${gradeTextStyle(option.grade)}`}
                        >
                          {option.value}
                        </div>
                      ))
                    : history.after_additional_potential_option.map(
                        (option, index) => (
                          <div
                            key={index}
                            className={`${gradeTextStyle(option.grade)}`}
                          >
                            {option.value}
                          </div>
                        )
                      )}
                </div>
                <div className="text-right">
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
