import { useState } from "react";
import { EquipmentPreset } from "../../../types/char";
import { replacementMap } from "../constants";
import { orderedListSlots } from "../constants";
import CharCurrentItem from "./CharCurrentItem";
import { mainStats, demonAvengerAddOption } from "../constants";
import BlueStar from "../../../assets/bluestar.svg";
import Star from "../../../assets/star.svg";

interface Props {
  selectedPresetEquipment: EquipmentPreset[] | undefined;
  charClass: string;
}

const CharEquipmentList = ({ selectedPresetEquipment, charClass }: Props) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const orderedEquipment =
    selectedPresetEquipment &&
    orderedListSlots.map((slot) =>
      selectedPresetEquipment?.find((item) => item.item_equipment_slot === slot)
    );

  const replaceStat = (stat: string | undefined) => {
    let replacedStat = stat;
    Object.keys(replacementMap).forEach((key) => {
      replacedStat = replacedStat?.replace(key, replacementMap[key]);
    });
    replacedStat = replacedStat?.replace(/ : /g, " ");
    return replacedStat;
  };

  const calculateMainAddOption = (
    item_add_option: {
      [key: string]: string | number | undefined;
    },
    item_equipment_slot: string,
    base_equipment_level: number | undefined
  ) => {
    const mainStat = mainStats[charClass];

    if (item_equipment_slot === "무기") return null;
    if (
      item_add_option &&
      base_equipment_level &&
      item_equipment_slot !== "무기"
    ) {
      if (charClass === "제논") {
        const mainStatValue =
          parseInt((item_add_option["str"] as string) || "0") +
          parseInt((item_add_option["dex"] as string) || "0") +
          parseInt((item_add_option["luk"] as string) || "0");
        const allStatValue =
          parseInt((item_add_option.all_stat as string) || "0") * 20;
        const specificStatValue =
          parseInt((item_add_option.magic_power as string) || "0") * 6;

        const mainAddOption = Math.round(
          (mainStatValue + allStatValue + specificStatValue) / 2
        );
        return mainAddOption > 0 ? mainAddOption + "급" : "";
      } else if (charClass === "데몬어벤져") {
        const mainStatValue =
          demonAvengerAddOption[base_equipment_level][
            item_add_option[mainStat] as string
          ];
        const specificStatValue = item_add_option.attack_power;
        return mainStatValue
          ? specificStatValue !== "0"
            ? `HP${mainStatValue} 공${specificStatValue}`
            : `HP${mainStatValue}`
          : "";
      } else {
        const mainStatValue = parseInt(
          (item_add_option[mainStat] as string) || "0"
        );
        const allStatValue =
          parseInt((item_add_option.all_stat as string) || "0") * 10;
        let specificStatValue = 0;
        if (mainStat === "int") {
          specificStatValue =
            parseInt((item_add_option.magic_power as string) || "0") * 4;
        } else {
          specificStatValue =
            parseInt((item_add_option.attack_power as string) || "0") * 4;
        }
        return mainStatValue + allStatValue + specificStatValue > 0
          ? mainStatValue + allStatValue + specificStatValue + "급"
          : "";
      }
    }
    return null;
  };

  return (
    <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3 whitespace-nowrap">
      {orderedEquipment &&
        orderedEquipment.map(
          (item, index) =>
            item && (
              <div
                className="relative text-sm py-1 cursor-pointer bg-dark-50 rounded-md"
                key={item.item_name}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="flex h-full items-center gap-x-1">
                  <div className="flex flex-col justify-center items-center basis-[44px] min-h-[40px] shrink-0">
                    <img src={item.item_icon} alt={item.item_name} />
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <div className="inline-flex gap-x-1 text-xs ">
                      {item.starforce !== "0" &&
                        item.starforce !== undefined && (
                          <div
                            className={`flex items-center gap-x-0.5 py-[1px] ${
                              item.starforce_scroll_flag === "사용"
                                ? "text-grade-200"
                                : "text-starforce-50"
                            } `}
                          >
                            <span>
                              <img
                                src={
                                  item.starforce_scroll_flag === "사용"
                                    ? BlueStar
                                    : Star
                                }
                                alt="star"
                                className="w-3 h-3"
                              />
                            </span>
                            <span>{item.starforce}</span>
                          </div>
                        )}
                      {item.item_add_option &&
                        calculateMainAddOption(
                          item.item_add_option,
                          item.item_equipment_slot,
                          item.item_base_option?.base_equipment_level
                        ) && (
                          <div className="flex items-center text-potential-200 text-[10px]">
                            {`${calculateMainAddOption(
                              item.item_add_option,
                              item.item_equipment_slot,
                              item.item_base_option?.base_equipment_level
                            )}`}
                          </div>
                        )}
                    </div>
                    <div className="font-semibold">
                      <span>
                        {item.special_ring_level
                          ? `${item.item_name} Lv${item.special_ring_level}`
                          : item.item_name}
                      </span>
                    </div>
                    <div className="text-[11px] space-y-0.5">
                      <div
                        className={`${
                          item.potential_option_grade === "레전드리"
                            ? "text-potential-50"
                            : item.potential_option_grade === "유니크"
                            ? "text-potential-100"
                            : item.potential_option_grade === "에픽"
                            ? "text-potential-150"
                            : "text-potential-200"
                        }`}
                      >
                        {item.potential_option_1 && (
                          <span className="pr-1 dark:text-white">잠재</span>
                        )}
                        <span>
                          {item.potential_option_1
                            ? `${replaceStat(item.potential_option_1)}, `
                            : ""}
                        </span>
                        <span>
                          {item.potential_option_2
                            ? `${replaceStat(item.potential_option_2)}, `
                            : ""}
                        </span>
                        <span>
                          {item.potential_option_3
                            ? `${replaceStat(item.potential_option_3)}`
                            : ""}
                        </span>
                      </div>
                      <div
                        className={`${
                          item.additional_potential_option_grade === "레전드리"
                            ? "text-potential-50"
                            : item.additional_potential_option_grade ===
                              "유니크"
                            ? "text-potential-100"
                            : item.additional_potential_option_grade === "에픽"
                            ? "text-potential-150"
                            : "text-potential-200"
                        }`}
                      >
                        {item.additional_potential_option_1 && (
                          <span className="pr-1 dark:text-white">에디</span>
                        )}
                        <span>
                          {item.additional_potential_option_1
                            ? `${replaceStat(
                                item.additional_potential_option_1
                              )}, `
                            : ""}
                        </span>
                        <span>
                          {item.additional_potential_option_2
                            ? `${replaceStat(
                                item.additional_potential_option_2
                              )}, `
                            : " "}
                        </span>
                        <span>
                          {replaceStat(item.additional_potential_option_3)}
                        </span>
                      </div>
                      {item.soul_option && (
                        <div>
                          <span className="pr-1"> 소울</span>
                          <span>{replaceStat(item.soul_option)}</span>
                        </div>
                      )}
                      <div></div>
                    </div>
                  </div>
                </div>
                {hoveredIndex === index && (
                  <div
                    className="absolute top-[98%] left-[50%] z-10 -translate-x-[50%] p-1 rounded-md border border-dark-100 dark:border-white bg-dark-100"
                    onMouseEnter={() => setHoveredIndex(null)}
                  >
                    <CharCurrentItem currentItem={item} />
                  </div>
                )}
              </div>
            )
        )}
    </div>
  );
};

export default CharEquipmentList;
