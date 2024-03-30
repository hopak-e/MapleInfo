import { useState, useEffect } from "react";
import { CharStatData, AbilityPreset, HyperStatPreset } from "../../types/char";
import PresetButton from "../bottons/PresetButton";
import CharApiService from "../../services/CharApiService";

interface Props {
  stat: CharStatData[];
  index: number;
}

interface StatProps {
  stat: CharStatData[];
  ocid: string;
}

const StatItem = ({ stat, index }: Props) => {
  const formattedValue =
    stat[index].stat_value === null
      ? null
      : stat[index].stat_value.includes(".")
      ? `${Number(stat[index].stat_value).toLocaleString()}%`
      : Number(stat[index].stat_value).toLocaleString();
  return (
    <div className="flex items-center justify-between px-1 rounded-sm">
      <span>{stat[index].stat_name}</span>
      <span>{formattedValue}</span>
    </div>
  );
};

const CharStat = ({ stat, ocid }: StatProps) => {
  const [hyperStat, setHyperStat] = useState<HyperStatPreset[][]>([]);
  const [hyperStatPreset, setHyperStatPreset] = useState<string>("");
  const [ability, setAbility] = useState<AbilityPreset[]>([]);
  const [abilityPreset, setAbilityPreset] = useState<number>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hyperStatData, abilityData] = await Promise.all([
          CharApiService.fetchHyperStat(ocid),
          CharApiService.fetchAbility(ocid),
        ]);

        const hyperStatArr = [
          hyperStatData.hyper_stat_preset_1,
          hyperStatData.hyper_stat_preset_2,
          hyperStatData.hyper_stat_preset_3,
        ];
        setHyperStat(hyperStatArr);
        setHyperStatPreset(hyperStatData.use_preset_no);

        const abilityArr = [
          abilityData.ability_preset_1,
          abilityData.ability_preset_2,
          abilityData.ability_preset_3,
        ];
        setAbility(abilityArr);
        setAbilityPreset(abilityData.preset_no);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [ocid]);

  const handlePresetButtonClick = (num: number) => {
    setHyperStatPreset(num.toString());
  };

  const handleAbilityButtonClick = (num: number) => {
    setAbilityPreset(num);
  };

  const selectedHyperStatPreset = hyperStat[Number(hyperStatPreset) - 1] || [];
  const filteredSelectedHyperStatPreset = selectedHyperStatPreset.filter(
    (item) => item.stat_level !== 0
  );

  const selectedAbilityPreset =
    ability.length > 0 && ability[Number(abilityPreset) - 1]?.ability_info;

  const renderStatItems = (indexes: number[]) =>
    indexes.map((index) => <StatItem key={index} stat={stat} index={index} />);

  return (
    <div className="flex flex-wrap text-sm gay-y-3 gap-x-2">
      <div className="basis-full sm:basis-1/2 md:basis-full max-w-[280px] mx-auto">
        <div className="font-[800] px-1 pb-2 text-lg">스탯</div>
        <div className="space-y-0.5 pb-2 border-b-[0.5px]">
          <StatItem stat={stat} index={42} />
          <div className="flex items-center justify-between px-1 rounded-sm">
            <span>스탯 공격력</span>
            <span>{stat[1].stat_value}</span>
          </div>
          {renderStatItems([2, 4, 3, 32])}
        </div>
        <div className="space-y-0.5 py-2 border-b">
          {renderStatItems([6, 7])}
        </div>
        <div className="space-y-0.5 py-2 border-b">
          {renderStatItems([36, 37, 8])}
        </div>
        <div className="space-y-0.5 py-2 border-b">
          <StatItem stat={stat} index={30} />
          <div className="flex items-center justify-between px-1 rounded-sm">
            <span>재사용 대기시간 감소</span>
            <span>
              {stat[33].stat_value}초 / {stat[34].stat_value}%
            </span>
          </div>
          <StatItem stat={stat} index={35} />
        </div>
        <div className="space-y-0.5 py-2 border-b">
          {renderStatItems([40, 41, 20, 21, 16, 17, 18, 19])}
        </div>
        <div className="space-y-0.5 py-2 border-b">
          {renderStatItems([13, 14, 15])}
        </div>
        <div className="space-y-0.5 py-2 border-b">
          <div className="flex items-center justify-between px-1 rounded-sm">
            <span>{stat[29].stat_name}</span>
            <span>{stat[29].stat_value}%</span>
          </div>
          <div className="flex items-center justify-between px-1 rounded-sm">
            <span>{stat[28].stat_name}</span>
            <span>{stat[28].stat_value}%</span>
          </div>
        </div>
        <div className="font-[800] px-1 mt-6 text-lg">하이퍼 스탯</div>
        <div className="flex py-2 gap-x-2">
          {[1, 2, 3].map((num) => (
            <PresetButton
              key={num}
              num={num}
              onClick={() => handlePresetButtonClick(num)}
              isSelected={Number(hyperStatPreset) === num}
            />
          ))}
        </div>
        <ul className="flex flex-col gap-y-1 text-xs">
          {filteredSelectedHyperStatPreset &&
            filteredSelectedHyperStatPreset.map((item, key) => (
              <li key={item.stat_type} className="flex items-center gap-x-2">
                <span className="text-center bg-dark-150 p-[1.5px] w-9 rounded-md">
                  Lv.{item.stat_level}
                </span>
                <span>{item.stat_increase}</span>
              </li>
            ))}
        </ul>
        <div className="font-[800] px-1 mt-6 text-lg">어빌리티</div>
        <div className="flex py-2 gap-x-2">
          {[1, 2, 3].map((num) => (
            <PresetButton
              key={num}
              num={num}
              onClick={() => handleAbilityButtonClick(num)}
              isSelected={Number(abilityPreset) === num}
            />
          ))}
        </div>
        <ul className="flex flex-col w-full gap-y-1 text-[10px]">
          {selectedAbilityPreset &&
            selectedAbilityPreset.map((item, key) => (
              <li
                key={item.ability_no}
                className="flex w-full items-center gap-x-2"
              >
                <span
                  className={`text-center font-[600] ${
                    item.ability_grade === "레전드리"
                      ? "bg-grade-50"
                      : item.ability_grade === "유니크"
                      ? "bg-grade-100"
                      : "bg-grade-150"
                  } p-[2px] w-full rounded-md`}
                >
                  {item.ability_value}
                </span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default CharStat;
