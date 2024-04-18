import { useState, useEffect } from "react";
import StarForceApiServices from "services/StarForceApiService";
import formatDate from "utils/dateUtils/formatDate";
import getDateRange from "utils/dateUtils/getDateRange";
import { Statement, StarForceHistory } from "types/starforce";
import StarForceMainChar from "./StarForceMainChar";
import StarForceStatement from "./StarForceStatement";
import StarForceResultList from "./StarForceResultList";
import Loading from "components/Loading/Loading";
import getApiKey from "utils/getApiKey";

const StarForce = () => {
  const [starForceHistory, setStarForceHistory] =
    useState<StarForceHistory[]>();
  const [starForceStatement, setStarForceStatement] = useState<Statement>();
  const [startDate, setStartDate] = useState<Date>(new Date("2023-12-27"));
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [itemList, setItemList] = useState<string[]>();
  const [characterList, setCharacterList] = useState<string[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = getApiKey();
        const dateRange = getDateRange(endDate, startDate);
        const resultPromises = dateRange.map(async (date) => {
          const formattedDate = formatDate(date);
          const dateRes = await StarForceApiServices.fetchStarforceData(
            apiKey,
            formattedDate,
            null
          );
          const historyResult = dateRes.starforce_history;

          if (dateRes.next_cursor) {
            const cursorRes = await StarForceApiServices.fetchStarforceData(
              apiKey,
              null,
              dateRes.next_cursor
            );
            historyResult.push(...cursorRes.starforce_history);
          }
          return historyResult;
        });

        const result = await Promise.all(resultPromises);
        const flattenedResult = result.flat();

        flattenedResult.sort(
          (a, b) =>
            new Date(b.date_create).getTime() -
            new Date(a.date_create).getTime()
        );
        setStarForceHistory(flattenedResult);
      } catch (error) {
        console.error("fetching error", error);
      }
    };
    fetchData();
  }, [startDate, endDate]);

  useEffect(() => {
    if (starForceHistory) {
      const statement: Statement = Array.from({ length: 25 }, (_, i) => ({
        count: 0,
        success: 0,
        destroyed: 0,
      }));
      const newItemList: string[] = ["모든 장비"];
      const newCharacterList: string[] = ["모든 캐릭터"];

      starForceHistory.forEach((history) => {
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
            statement[countIndex].count++;
            if (
              history.after_starforce_count ===
              history.before_starforce_count + 1
            ) {
              statement[successIndex].success++;
            }

            if (history.item_upgrade_result === "파괴") {
              statement[destroyedIndex].destroyed++;
            }
          }
        } else {
          if (history.chance_time === "찬스타임 미적용") {
            statement[countIndex].count++;

            if (
              history.after_starforce_count ===
              history.before_starforce_count + 1
            ) {
              statement[successIndex].success++;
            }

            if (history.item_upgrade_result === "파괴") {
              statement[destroyedIndex].destroyed++;
            }
          }
        }

        if (!newItemList.includes(history.target_item)) {
          newItemList.push(history.target_item);
        }

        if (!newCharacterList.includes(history.character_name)) {
          newCharacterList.push(history.character_name);
        }
      });

      setStarForceStatement(statement);
      setItemList(newItemList);
      setCharacterList(newCharacterList);
    }
  }, [starForceHistory]);

  const handleStartDateChange = (date: Date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date) => {
    setEndDate(date);
  };

  return (
    <div className="grow shrink-0 max-w-[1120px] mx-auto w-full p-2 dark:bg-dark-250">
      <div className="flex flex-col gap-y-2 ">
        <StarForceMainChar starForceHistory={starForceHistory} />
        {starForceHistory && starForceStatement ? (
          <div className="grid grid-cols-1  md:grid-cols-[250px_1fr] gap-x-2">
            <StarForceStatement
              starForceHistory={starForceHistory}
              starForceStatement={starForceStatement}
            />
            <StarForceResultList
              starForceHistory={starForceHistory}
              startDate={startDate}
              endDate={endDate}
              itemList={itemList}
              characterList={characterList}
              handleStartDateChange={handleStartDateChange}
              handleEndDateChange={handleEndDateChange}
            />
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default StarForce;
