import { useState } from "react";
import { EquipmentPreset } from "types/char";
import { orderedInventorySlots } from "../constants";
import Star from "assets/star.svg";
import CharCurrentItem from "./CharCurrentItem";

interface SelectedEquipProps {
  selectedPresetEquipment: EquipmentPreset[] | undefined;
}

const CharInventory = ({ selectedPresetEquipment }: SelectedEquipProps) => {
  const [currentItem, setcurrentItem] = useState<EquipmentPreset | null>(null);

  const orderedInventory =
    selectedPresetEquipment &&
    orderedInventorySlots.map((slot) =>
      selectedPresetEquipment?.find((item) => item.item_equipment_slot === slot)
    );

  const gradeBorderStyles: { [key: string]: string } = {
    레전드리: "border border-grade-50 bg-grade-450 dark:bg-grade-250",
    유니크: "border border-grade-100 bg-grade-500 dark:bg-grade-300",
    에픽: "border border-grade-150 bg-grade-550 dark:bg-grade-350",
    레어: "border border-grade-200 bg-grade-600 dark:bg-grade-400",
    default: "border border-dark-50 dark:border-dark-150",
  };
  const getBorderStyle = (potentialOptionGrade: string | undefined) => {
    return gradeBorderStyles[potentialOptionGrade || "default"];
  };

  const handleMouseEnter = (item: EquipmentPreset) => {
    setcurrentItem(item);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-[620px] dark:text-white">
      <div
        className="grid grid-cols-[3.5rem_3.5rem_3.5rem_3.5rem_3.5rem] grid-rows-[3.5rem_3.5rem_3.5rem_3.5rem_3.5rem_3.5rem] gap-0.5
        justify-center"
      >
        {orderedInventory &&
          orderedInventory.map((item) =>
            item ? (
              <div
                key={item.item_equipment_slot}
                className={`relative flex justify-center rounded-md cursor-pointer ${getBorderStyle(
                  item.potential_option_grade
                )}`}
                onMouseEnter={() => handleMouseEnter(item)}
              >
                <img
                  src={item.item_icon}
                  alt={item.item_name}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
                {Number(item.starforce) > 0 && (
                  <div className="absolute top-0 left-0 pl-[1px] pt-[1px] inline-flex items-center text-xs">
                    <div className="inline-flex items-center text-[1em] gap-x-0.5 text-starforce-50 font-[600]">
                      <img src={Star} className="w-[1em] h-[1em]" alt="star" />
                      {item.starforce}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative flex justify-center items-center rounded-md"></div>
            )
          )}
      </div>
      {currentItem ? (
        <CharCurrentItem currentItem={currentItem} />
      ) : (
        <div className="flex w-[260px] h-[300px] dark:bg-dark-100 rounded-sm ">
          <div className="flex w-full justify-center  items-center">
            장비를 선택해주세요
          </div>
        </div>
      )}
    </div>
  );
};

export default CharInventory;
