import { useState, useEffect } from "react";
import CharApiService from "../../../services/CharApiService";
import { Equipment, EquipmentPreset } from "../../../types/char";
import PresetButton from "../../bottons/PresetButton";
import { orderedSlots } from "./orderedSlots";
import { replacementMap } from "./replacementMap";

interface CharEquipmentProps {
  ocid: string;
}

const CharEquipment = ({ ocid }: CharEquipmentProps) => {
  const [equipment, setEquipment] = useState<EquipmentPreset[][]>([]);
  const [equipmentPreset, setEquipmentPreset] = useState<number>();
  const [listUpType, setListUpType] = useState<string>("목록");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const equipmentData: Equipment = await CharApiService.fetchEquipment(
          ocid
        );
        const equipmetnArr = [
          equipmentData.item_equipment_preset_1,
          equipmentData.item_equipment_preset_2,
          equipmentData.item_equipment_preset_3,
        ];
        setEquipment(equipmetnArr);
        setEquipmentPreset(equipmentData.preset_no);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [ocid]);

  const handleEquipmentPresetButtonClick = (num: number) => {
    setEquipmentPreset(num);
  };
  const handleListUpTypeButtonClick = (listType: string) => {
    setListUpType(listType);
  };

  const selectedPresetEquipment =
    equipmentPreset && equipment[equipmentPreset - 1];

  //칭호 안드로이드도 넣어야됨
  //반지 레벨 이미지

  const orderedEquipment =
    selectedPresetEquipment &&
    orderedSlots.map((slot) =>
      selectedPresetEquipment.find((item) => item?.item_equipment_slot === slot)
    );

  const replaceStat = (stat: string | undefined) => {
    let replacedStat = stat;
    Object.keys(replacementMap).forEach((key) => {
      replacedStat = replacedStat?.replace(key, replacementMap[key]);
    });
    replacedStat = replacedStat?.replace(/ : /g, " ");
    return replacedStat;
  };

  return (
    <div className="grow shrink space-y-3">
      <div className="w-full rounded-sm bg-dark-200 p-2">
        <div className="flex justify-between w-full pt-1 pb-3  ">
          <div className="flex gap-x-2">
            {[1, 2, 3].map((num) => (
              <PresetButton
                key={num}
                num={num}
                onClick={() => handleEquipmentPresetButtonClick(num)}
                isSelected={Number(equipmentPreset) === num}
              />
            ))}
          </div>
          <div className="flex text-xs gap-x-2 pr-2">
            <button
              className={`w-14 py-1 rounded-full ${
                listUpType === "목록" ? "bg-dark-50" : "bg-dark-150"
              }`}
              onClick={() => handleListUpTypeButtonClick("목록")}
            >
              목록
            </button>
            <button
              className={`w-14 py-1 rounded-full ${
                listUpType === "장비창" ? "bg-dark-50" : "bg-dark-150"
              }`}
              onClick={() => handleListUpTypeButtonClick("장비창")}
            >
              장비창
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3 whitespace-nowrap">
          {orderedEquipment &&
            orderedEquipment.map((item, key) => (
              <div
                className="text-sm py-1 cursor-pointer bg-dark-150 "
                key={key}
              >
                <div className="flex h-full items-center gap-x-1">
                  <div className="flex flex-col justify-center items-center basis-[44px] min-h-[40px] shrink-0">
                    <img src={item?.item_icon} alt={item?.item_name} />
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <div className="inline-flex gap-x-0.5 text-xs"></div>
                    <div className="font-semibold">
                      <span>
                        {item?.special_ring_level
                          ? `${item?.item_name} Lv${item.special_ring_level}`
                          : item?.item_name}
                      </span>
                    </div>
                    <div className="text-[12px] space-y-0.5">
                      <div>
                        {item?.potential_option_1 && (
                          <span className="pr-1">잠재</span>
                        )}
                        <span>
                          {item?.potential_option_1
                            ? `${replaceStat(item?.potential_option_1)}, `
                            : ""}
                        </span>
                        <span>
                          {item?.potential_option_2
                            ? `${replaceStat(item?.potential_option_2)}, `
                            : ""}
                        </span>
                        <span>
                          {item?.potential_option_3
                            ? `${replaceStat(item?.potential_option_3)}`
                            : ""}
                        </span>
                      </div>
                      <div>
                        {item?.additional_potential_option_1 && (
                          <span className="pr-1">에디</span>
                        )}
                        <span>
                          {item?.additional_potential_option_1
                            ? `${replaceStat(
                                item?.additional_potential_option_1
                              )}, `
                            : ""}
                        </span>
                        <span>
                          {item?.additional_potential_option_2
                            ? `${replaceStat(
                                item?.additional_potential_option_2
                              )}, `
                            : " "}
                        </span>
                        <span>
                          {replaceStat(item?.additional_potential_option_3)}
                        </span>
                      </div>
                      {item?.soul_option && (
                        <div>
                          <span className="pr-1"> 소울</span>
                          <span>{replaceStat(item.soul_option)}</span>
                        </div>
                      )}
                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CharEquipment;
