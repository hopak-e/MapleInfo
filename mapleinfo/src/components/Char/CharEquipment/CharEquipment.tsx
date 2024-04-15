import { useState, useEffect } from "react";
import CharApiService from "services/CharApiService";
import { EquipmentPreset } from "types/char";
import PresetButton from "components/bottons/PresetButton";
import CharEquipmentList from "./CharEquipmentList";
import CharInventory from "./CharInventory";

interface CharEquipmentProps {
  ocid: string;
  charClass: string;
}

const CharEquipment = ({ ocid, charClass }: CharEquipmentProps) => {
  const [equipment, setEquipment] = useState<EquipmentPreset[][]>([]);
  const [equipmentPreset, setEquipmentPreset] = useState<number | undefined>();
  const [listUpType, setListUpType] = useState<string>("목록");
  const [selectedPresetEquipment, setSelectedPressetEquipment] = useState<
    EquipmentPreset[] | undefined
  >(undefined);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [equipmentData, androidData] = await Promise.all([
          CharApiService.fetchEquipment(ocid),
          CharApiService.fetchAndroid(ocid),
        ]);

        const equipmetnArr = [
          equipmentData.item_equipment_preset_1,
          equipmentData.item_equipment_preset_2,
          equipmentData.item_equipment_preset_3,
        ];

        const android: EquipmentPreset = {
          item_name: androidData.android_name,
          item_icon: androidData.android_icon,
          item_description: androidData.android_description,
          item_equipment_slot: "안드로이드",
          item_equipment_part: "안드로이드",
        };

        const title: EquipmentPreset = {
          item_name: equipmentData.title?.title_name,
          item_icon: equipmentData.title?.title_icon,
          item_description: equipmentData.title?.title_description,
          date_option_expire: equipmentData.title?.date_option_expire,
          item_equipment_slot: "칭호",
          item_equipment_part: "칭호",
        };

        const mappedArr = equipmetnArr.map((presetArr) => {
          const presets = [...presetArr];
          if (androidData.android_name !== null) {
            presets.push(android);
          }
          if (equipmentData.title !== null) {
            presets.push(title);
          }
          return presets;
        });

        setEquipment(mappedArr);
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

  useEffect(() => {
    equipmentPreset &&
      setSelectedPressetEquipment(equipment[equipmentPreset - 1]);
  }, [equipment, equipmentPreset]);

  return (
    <div className="grow shrink space-y-3">
      <div className="p-2 rounded-sm border-[0.5px] border-dark-150 dark:border-none dark:bg-dark-200 shadow-md">
        <div className="flex justify-between pt-1 pb-3">
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
                listUpType === "목록"
                  ? "bg-dark-150 dark:bg-dark-50"
                  : "bg-dark-300 dark:bg-dark-150"
              }`}
              onClick={() => handleListUpTypeButtonClick("목록")}
            >
              목록
            </button>
            <button
              className={`w-14 py-1 rounded-full ${
                listUpType === "장비창"
                  ? "bg-dark-150 dark:bg-dark-50"
                  : "bg-dark-300 dark:bg-dark-150"
              }`}
              onClick={() => handleListUpTypeButtonClick("장비창")}
            >
              장비창
            </button>
          </div>
        </div>
        {listUpType === "목록" ? (
          <CharEquipmentList
            selectedPresetEquipment={selectedPresetEquipment}
            charClass={charClass}
          />
        ) : (
          <CharInventory selectedPresetEquipment={selectedPresetEquipment} />
        )}
      </div>
    </div>
  );
};

export default CharEquipment;
//
