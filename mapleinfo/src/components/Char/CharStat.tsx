import { useState, useEffect } from "react";
import { CharStatData, HyperStat } from "../../types/char";
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
  const formattedValue = stat[index].stat_value.includes(".")
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
  const [hyperStat, setHyperStat] = useState<HyperStat | undefined>();
  const [hyperStatPreset, setHyperStatPreset] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hyperStatData = await CharApiService.fetchHyperStat(ocid);
        setHyperStat(hyperStatData);
        setHyperStatPreset(hyperStatData.use_preset_no);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [ocid]);
  console.log(hyperStat);
  console.log(hyperStatPreset);
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
          <StatItem stat={stat} index={2} />
          <StatItem stat={stat} index={4} />
          <StatItem stat={stat} index={3} />
          <StatItem stat={stat} index={32} />
        </div>
        <div className="space-y-0.5 py-2 border-b">
          <StatItem stat={stat} index={6} />
          <StatItem stat={stat} index={7} />
        </div>
        <div className="space-y-0.5 py-2 border-b">
          <StatItem stat={stat} index={36} />
          <StatItem stat={stat} index={37} />
          <StatItem stat={stat} index={8} />
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
          <StatItem stat={stat} index={40} />
          <StatItem stat={stat} index={41} />
          <StatItem stat={stat} index={20} />
          <StatItem stat={stat} index={21} />
          <StatItem stat={stat} index={16} />
          <StatItem stat={stat} index={17} />
          <StatItem stat={stat} index={18} />
          <StatItem stat={stat} index={19} />
        </div>
        <div className="space-y-0.5 py-2 border-b">
          <StatItem stat={stat} index={13} />
          <StatItem stat={stat} index={14} />
          <StatItem stat={stat} index={15} />
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
          <PresetButton num={1} />
          <PresetButton num={2} />
          <PresetButton num={3} />
        </div>
      </div>
    </div>
  );
};

export default CharStat;
