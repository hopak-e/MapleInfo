import { useState, useEffect } from "react";
import StarForceApiServices from "services/StarForceApiService";
import formatDate from "utils/formatDate";
import { StarForceResult, StarForceHistory } from "types/starforce";
import { statement, Statement } from "./constants";
import StarForceMainChar from "./StarForceMainChar";
import StarForceBriefStatement from "./StarForceBriefStatement";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.module.css";
import StarForceResultList from "./StarForceResultList";

const StarForce = () => {
  const [starForceHistory, setStarForceHistory] =
    useState<StarForceHistory[]>();
  const [starForceStateMent, setStarForceStateMent] = useState<Statement>();
  const [startDate, setStartDate] = useState<Date>(new Date("2023-12-27"));
  const [endDate, setEndDate] = useState<Date>(new Date());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dateRange = getDates(endDate, startDate);
        let historyResult: StarForceHistory[] = [];

        await Promise.all(
          dateRange.map(async (date) => {
            const formattedDate = formatDate(date);
            const dateRes: StarForceResult =
              await StarForceApiServices.fetchStarforceData(
                formattedDate,
                null
              );
            if (dateRes.starforce_history.length > 0) {
              historyResult = await historyResult.concat(
                dateRes.starforce_history
              );
            }
            if (dateRes.next_cursor) {
              const cursorRes: StarForceResult =
                await StarForceApiServices.fetchStarforceData(
                  null,
                  dateRes.next_cursor
                );
              historyResult = historyResult.concat(cursorRes.starforce_history);
            }

            await historyResult.sort(
              (a, b) =>
                new Date(b.date_create).getTime() -
                new Date(a.date_create).getTime()
            );
            setStarForceHistory(historyResult);
          })
        );
      } catch (error) {
        console.error("fetching error", error);
      }
    };
    fetchData();
  }, [startDate, endDate]);

  useEffect(() => {
    if (starForceHistory) {
      const newStatement = { ...statement };
      const itemList: string[] = [];

      starForceHistory.reduce((acc, history) => {
        const countIndex = history.before_starforce_count;
        const successIndex = history.before_starforce_count;
        const destroyedIndex = history.before_starforce_count;
        if (history.starforce_event_list) {
          const exceptCount = history.starforce_event_list
            .find((list) => list.success_rate !== "null")
            ?.starforce_event_range.split(",")
            .map(Number);
          if (
            exceptCount &&
            !exceptCount.includes(countIndex) &&
            !exceptCount.includes(successIndex) &&
            history.chance_time === "찬스타임 미적용"
          ) {
            acc[countIndex] = {
              ...acc[countIndex],
              count: acc[countIndex].count + 1,
            };

            if (
              history.after_starforce_count ===
              history.before_starforce_count + 1
            ) {
              acc[successIndex] = {
                ...acc[successIndex],
                success: acc[successIndex].success + 1,
              };
            }

            if (history.item_upgrade_result === "파괴") {
              acc[destroyedIndex] = {
                ...acc[destroyedIndex],
                destroyed: acc[destroyedIndex].destroyed + 1,
              };
            }
          }
        } else {
          if (history.chance_time === "찬스타임 미적용") {
            acc[countIndex] = {
              ...acc[countIndex],
              count: acc[countIndex].count + 1,
            };

            if (
              history.after_starforce_count ===
              history.before_starforce_count + 1
            ) {
              acc[successIndex] = {
                ...acc[successIndex],
                success: acc[successIndex].success + 1,
              };
            }

            if (history.item_upgrade_result === "파괴") {
              acc[destroyedIndex] = {
                ...acc[destroyedIndex],
                destroyed: acc[destroyedIndex].destroyed + 1,
              };
            }
          }
        }
        if (!itemList.includes(history.target_item)) {
          itemList.push(history.target_item);
        }
        console.log(itemList);
        return acc;
      }, newStatement);

      setStarForceStateMent(newStatement);
    }
  }, [starForceHistory]);
  // console.log(successRates);
  // console.log(starForceHistory);
  // console.log(mainCharInfo);

  const getDates = (endDate: Date, startDate: Date): Date[] => {
    const dates = [];
    let currentDate = endDate;
    while (currentDate >= startDate) {
      dates.push(currentDate);
      currentDate = new Date(currentDate);
      currentDate.setDate(currentDate.getDate() - 1);
    }
    return dates;
  };

  const handleStartDateChange = (date: Date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date) => {
    setEndDate(date);
  };

  return (
    <div className="grow shrink-0 max-w-[1120px] mx-auto w-full p-2 bg-dark-250">
      <div className="flex flex-col gap-y-2 ">
        <StarForceMainChar starForceHistory={starForceHistory} />
        {starForceHistory && starForceStateMent && (
          <div className="grid grid-cols-1  md:grid-cols-[250px_1fr] gap-x-2">
            <StarForceBriefStatement
              starForceHistory={starForceHistory}
              starForceStateMent={starForceStateMent}
            />
            <div className="grow shrink">
              <div className="flex items-center justify-between w-full">
                <div>
                  <span>강화내역</span>
                  <span>{`(${starForceHistory.length}건)`}</span>
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
              <div className="flex gap-x-2">
                <div>모든 장비</div>
                <div>모든 캐릭터</div>
              </div>
              <StarForceResultList starForceHistory={starForceHistory} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StarForce;
