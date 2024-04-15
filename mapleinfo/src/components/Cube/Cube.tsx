import { useState, useEffect } from "react";
import CubeApiService from "services/CubeApiService";
import formatDate from "utils/dateUtils/formatDate";
import getDateRange from "utils/dateUtils/getDateRange";
import { CubeHistory, CubeStatements } from "types/cube";
import { cubePotentialPrice, cubeAdditionalPotentialPrice } from "./constants";
import CubeMainChar from "./CubeMainChar";
import CubeResultList from "./CubeResultList";
import CubeStatement from "./CubeStatement";
import formatNumber from "utils/formatNumber";

const Cube = () => {
  const [cubeHistory, setCubeHistory] = useState<CubeHistory[]>();
  const [cubeStatements, setCubeStatements] = useState<CubeStatements>();
  const [startDate, setStartDate] = useState<Date>(new Date("2024-01-25"));
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [totalPrice, setTotalPrice] = useState<string>();
  const [equipList, setEquipList] = useState<string[]>();
  const [characterList, setCharacterList] = useState<string[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dateRange = getDateRange(endDate, startDate);
        const resultPromises = dateRange.map(async (date) => {
          const formattedDate = formatDate(date);
          const dateRes = await CubeApiService.fetchCubeData(
            formattedDate,
            null
          );
          const historyResult = dateRes.potential_history;

          if (dateRes.next_cursor) {
            const cursorRes = await CubeApiService.fetchCubeData(
              null,
              dateRes.next_cursor
            );
            historyResult.push(...cursorRes.potential_history);
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

        setCubeHistory(flattenedResult);
      } catch (error) {
        console.error("fetching error", error);
      }
    };
    fetchData();
  }, [startDate, endDate]);

  useEffect(() => {
    if (cubeHistory) {
      const statement: CubeStatements = {
        레어: {
          potentialOption: { count: 0, success: 0 },
          additionalOption: { count: 0, success: 0 },
        },
        에픽: {
          potentialOption: { count: 0, success: 0 },
          additionalOption: { count: 0, success: 0 },
        },
        유니크: {
          potentialOption: { count: 0, success: 0 },
          additionalOption: { count: 0, success: 0 },
        },
        레전드리: {
          potentialOption: { count: 0, success: 0 },
          additionalOption: { count: 0, success: 0 },
        },
      };
      let usagePrice = 0;
      const neweEuipList: string[] = ["모든 장비"];
      const newCharacterList: string[] = ["모든 캐릭터"];

      cubeHistory.forEach((history) => {
        const potentialGrade =
          history.before_potential_option &&
          history.before_potential_option[0]?.grade;
        const additionalPotentialGrade =
          history.before_additional_potential_option &&
          history.before_additional_potential_option[0]?.grade;

        if (history.potential_type === "잠재능력 재설정") {
          statement[potentialGrade].potentialOption.count++;
          if (history.item_upgrade_result === "성공") {
            statement[potentialGrade].potentialOption.success++;
          }
          if (history.item_level >= 250) {
            usagePrice += cubePotentialPrice[250][potentialGrade];
          } else if (history.item_level >= 200) {
            usagePrice += cubePotentialPrice[200][potentialGrade];
          } else if (history.item_level >= 160) {
            usagePrice += cubePotentialPrice[160][potentialGrade];
          } else {
            usagePrice += cubePotentialPrice[1][potentialGrade];
          }
        } else {
          statement[additionalPotentialGrade].additionalOption.count++;
          if (history.item_upgrade_result === "성공") {
            statement[additionalPotentialGrade].additionalOption.success++;
          }
          if (history.item_level >= 250) {
            usagePrice +=
              cubeAdditionalPotentialPrice[250][additionalPotentialGrade];
          } else if (history.item_level >= 200) {
            usagePrice +=
              cubeAdditionalPotentialPrice[200][additionalPotentialGrade];
          } else if (history.item_level >= 160) {
            usagePrice +=
              cubeAdditionalPotentialPrice[160][additionalPotentialGrade];
          } else {
            usagePrice +=
              cubeAdditionalPotentialPrice[1][additionalPotentialGrade];
          }
        }
        if (!neweEuipList.includes(history.target_item)) {
          neweEuipList.push(history.target_item);
        }
        if (!newCharacterList.includes(history.character_name)) {
          newCharacterList.push(history.character_name);
        }
      });
      const formattedUsagePrice = formatNumber(usagePrice);
      setTotalPrice(formattedUsagePrice);
      setCubeStatements(statement);
      setEquipList(neweEuipList);
      setCharacterList(newCharacterList);
    }
  }, [cubeHistory]);

  const handleStartDateChange = (date: Date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date) => {
    setEndDate(date);
  };

  return (
    <div className="grow shrink-0 max-w-[1120px] mx-auto w-full p-2 dark:bg-dark-250">
      <div className="flex flex-col gap-y-2 ">
        <CubeMainChar cubeHistory={cubeHistory} />
        {cubeHistory && cubeStatements && (
          <div className="grid grid-cols-1  md:grid-cols-[250px_1fr] gap-x-2 gap-y-2">
            <CubeStatement
              cubeHistory={cubeHistory}
              cubeStatements={cubeStatements}
              totalPrice={totalPrice}
            />
            <CubeResultList
              cubeHistory={cubeHistory}
              startDate={startDate}
              endDate={endDate}
              equipList={equipList}
              characterList={characterList}
              handleStartDateChange={handleStartDateChange}
              handleEndDateChange={handleEndDateChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Cube;
