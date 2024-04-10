import { useState, useEffect } from "react";
import CubeApiService from "services/CubeApiService";
import formatDate from "utils/formatDate";
import getDateRange from "utils/getDateRange";
import { CubeHistory, CubeStatement } from "types/cube";
import { cubePotentialPrice, cubeAdditionalPotentialPrice } from "./constants";
import CubeMainChar from "./CubeMainChar";
import CubeResultList from "./CubeResultList";

const Cube = () => {
  const [cubeHistory, setCubeHistory] = useState<CubeHistory[]>();
  const [cubeStatement, setCubeStatement] = useState<CubeStatement>();
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
      const statement: CubeStatement = {
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
      setCubeStatement(statement);
      setEquipList(neweEuipList);
      setCharacterList(newCharacterList);
    }
  }, [cubeHistory]);

  const formatNumber = (num: number) => {
    const trillion = Math.floor(num / 1000000000000);
    const oneHunderedMillion = Math.floor((num % 1000000000000) / 100000000);
    const tenThousand = Math.floor((num % 100000000) / 10000);

    let result = "";

    if (trillion > 0) {
      result += `${trillion}조 `;
    }

    if (oneHunderedMillion > 0) {
      result += `${oneHunderedMillion}억 `;
    }

    if (tenThousand > 0) {
      result += `${tenThousand}만 `;
    }

    return result;
  };

  const handleStartDateChange = (date: Date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date) => {
    setEndDate(date);
  };

  console.log(cubeHistory);
  // console.log(cubeStatement);

  return (
    <div className="grow shrink-0 max-w-[1120px] mx-auto w-full p-2 bg-dark-250">
      <div className="flex flex-col gap-y-2 ">
        <CubeMainChar cubeHistory={cubeHistory} />
        {cubeHistory && cubeStatement && (
          <div className="grid grid-cols-1  md:grid-cols-[250px_1fr] gap-x-2">
            <div className="grow-0 shrink-0 basis-[250px]">
              <div className="flex flex-col gap-y-2">
                <div className="flex flex-col text-center bg-dark-50 rounded-sm">
                  <div>재설정 횟수</div>
                  <div>{cubeHistory.length}</div>
                </div>
                <div className="flex flex-col text-center bg-dark-50 rounded-sm">
                  <div>누적 사용 메소</div>
                  <div>{totalPrice}</div>
                </div>
                <div className="flex flex-col py-1 bg-dark-50 rounded-sm">
                  <div className="pl-2 py-1">잠재설정</div>
                  <table className="flex flex-col text-[14px] text-center">
                    <thead className="bg-dark-200">
                      <tr className="flex pl-2">
                        <td className="flex-1 text-start">등급</td>
                        <td className="flex-1">재설정 횟수</td>
                        <td className="flex-1">등급업 횟수</td>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(cubeStatement).map(([key, value]) => (
                        <tr key={key} className="flex">
                          <td className="flex-1 text-start pl-2">{key}</td>
                          <td className="flex-1">{`${
                            value.potentialOption.count === 0
                              ? "-"
                              : value.potentialOption.count
                          }`}</td>
                          <td className="flex-1">{`${
                            value.potentialOption.success === 0
                              ? "-"
                              : value.potentialOption.success
                          }`}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex flex-col py-1 bg-dark-50 rounded-sm">
                  <div className="pl-2 py-1">에디셔널 잠재설정</div>
                  <table className="flex flex-col text-[14px] text-center">
                    <thead className="bg-dark-200">
                      <tr className="flex">
                        <td className="flex-1 text-start pl-2">등급</td>
                        <td className="flex-1">재설정 횟수</td>
                        <td className="flex-1">등급업 횟수</td>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(cubeStatement).map(([key, value]) => (
                        <tr key={key} className="flex">
                          <td className="flex-1 text-start pl-2">{key}</td>
                          <td className="flex-1">{`${
                            value.additionalOption.count === 0
                              ? "-"
                              : value.additionalOption.count
                          }`}</td>
                          <td className="flex-1">{`${
                            value.additionalOption.success === 0
                              ? "-"
                              : value.additionalOption.success
                          }`}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
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
