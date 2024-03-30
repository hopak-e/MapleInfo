import { EquipmentPreset } from "../../../types/char";
import { replacementMap } from "./replacementMap";
import { orderedListSlots } from "./orderedSlots";
import Star from "../../../assets/star.svg";

interface Props {
  selectedPresetEquipment: EquipmentPreset[] | undefined;
}

const CharEquipmentList = ({ selectedPresetEquipment }: Props) => {
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

  return (
    <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3 whitespace-nowrap">
      {orderedEquipment &&
        orderedEquipment.map(
          (item, key) =>
            item && (
              <div
                className="text-sm py-1 cursor-pointer bg-dark-150 "
                key={key}
              >
                <div className="flex h-full items-center gap-x-1">
                  <div className="flex flex-col justify-center items-center basis-[44px] min-h-[40px] shrink-0">
                    <img src={item.item_icon} alt={item.item_name} />
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <div className="inline-flex gap-x-0.5 text-xs ">
                      {item.starforce === "0" ||
                      item.starforce === undefined ? null : (
                        <div className="flex items-center gap-x-0.5 py-[1px] px-[2px] text-starforce-50 bg-dark-250">
                          <span>
                            <img src={Star} alt="star" className="w-3 h-3" />
                          </span>
                          <span>{item.starforce}</span>
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
                    <div className="text-[12px] space-y-0.5">
                      <div>
                        {item.potential_option_1 && (
                          <span className="pr-1">잠재</span>
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
                      <div>
                        {item.additional_potential_option_1 && (
                          <span className="pr-1">에디</span>
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
              </div>
            )
        )}
    </div>
  );
};

export default CharEquipmentList;
