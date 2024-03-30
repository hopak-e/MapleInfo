import { useState } from "react";
import { EquipmentPreset } from "../../../types/char";
import { orderedInventorySlots } from "./orderedSlots";
import StarCountDisplay from "./StarCountDisplay";
import Star from "../../../assets/star.svg";
import Rare from "../../../assets/rare.png";
import Epic from "../../../assets/epic.png";
import Unique from "../../../assets/unique.png";
import Legendary from "../../../assets/legendary.png";

interface Props {
  selectedPresetEquipment: EquipmentPreset[] | undefined;
}

const Inventory = ({ selectedPresetEquipment }: Props) => {
  const [currentItem, setcurrentItem] = useState<EquipmentPreset | null>(null);

  const orderedInventory =
    selectedPresetEquipment &&
    orderedInventorySlots.map((slot) =>
      selectedPresetEquipment?.find((item) => item.item_equipment_slot === slot)
    );

  const gradeBorderStyles: { [key: string]: string } = {
    레전드리: "border border-grade-50 bg-grade-250",
    유니크: "border border-grade-100 bg-grade-300",
    에픽: "border border-grade-150 bg-grade-350",
    레어: "border border-grade-200 bg-grade-400",
    default: "border",
  };
  const getBorderStyle = (potentialOptionGrade: string | undefined) => {
    return gradeBorderStyles[potentialOptionGrade || "default"];
  };
  const gradeItemOptionStyles: { [key: string]: string } = {
    레전드리: "text-potential-50",
    유니크: "text-potential-100",
    에픽: "text-potential-150",
    레어: "text-potential-200",
  };
  const getPotentialOptionStyles = (potentialOptionGrade: string) => {
    return gradeItemOptionStyles[potentialOptionGrade];
  };

  const handleMouseEnter = (item: EquipmentPreset) => {
    setcurrentItem(item);
  };
  console.log(orderedInventory);
  console.log(currentItem);
  //레벨별로 최대 스타포스 수
  //놀장 별 색깔
  const renderBasicOption = (
    label: string,
    totlaOption: string | number | undefined,
    baseOption: string | number | undefined,
    addOption: string | number | undefined,
    etcOption: string | number | undefined,
    starforceOption: string | number | undefined
  ) => {
    return (
      totlaOption !== "0" && (
        <div className="[word-spacing:-1px]">
          <span>{`${label} : ${totlaOption}`}</span>
          {totlaOption !== baseOption ? (
            <>
              <span>{` (`}</span>
              {baseOption && <span>{baseOption}</span>}
              {addOption && addOption !== "0" && (
                <span className="text-itemoption-add [word-spacing:-2px]">{` + ${addOption}`}</span>
              )}
              {etcOption && etcOption !== "0" && (
                <span className="text-itemoption-etc [word-spacing:-2px]">{` + ${etcOption}`}</span>
              )}
              {starforceOption && starforceOption !== "0" && (
                <span className="text-itemoption-starforce [word-spacing:-2px]">
                  {` + ${starforceOption}`}
                </span>
              )}
              <span>{`)`}</span>
            </>
          ) : null}
        </div>
      )
    );
  };

  const renderPercentOption = (
    label: string,
    totlaOption: string | number | undefined,
    baseOption?: string | number | undefined,
    addOption?: string | number | undefined,
    etcOption?: string | number | undefined,
    starforceOption?: string | number | undefined
  ) => {
    return (
      totlaOption !== "0" && (
        <div className="[word-spacing:-1px]">
          <span>{`${label} : ${totlaOption}%`}</span>
          {totlaOption !== baseOption ? (
            <>
              <span>{` (`}</span>
              {baseOption && <span>{`${baseOption}%`}</span>}
              {addOption && addOption !== "0" && (
                <span className="text-itemoption-add [word-spacing:-2px]">{` + ${addOption}%`}</span>
              )}
              {etcOption && etcOption !== "0" && (
                <span className="text-itemoption-etc [word-spacing:-2px]">{` + ${etcOption}%`}</span>
              )}
              {starforceOption && starforceOption !== "0" && (
                <span className="text-itemoption-starforce [word-spacing:-2px]">{` + ${starforceOption}%`}</span>
              )}
              <span>{`)`}</span>
            </>
          ) : null}
        </div>
      )
    );
  };

  const getPotentialImg = (potential: string) => {
    if (potential === "레전드리")
      return (
        <img src={Legendary} alt="레전드리" className="w-[12px] h-[12px]" />
      );
    if (potential === "유니크")
      return <img src={Unique} alt="유니크" className="w-[12px] h-[12px]" />;
    if (potential === "에픽")
      return <img src={Epic} alt="에픽" className="w-[12px] h-[12px]" />;
    if (potential === "레어")
      return <img src={Rare} alt="레어" className="w-[12px] h-[12px]" />;
  };

  console.log(currentItem);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div
        className="grid grid-cols-[3.5rem_3.5rem_3.5rem_3.5rem_3.5rem] grid-rows-[3.5rem_3.5rem_3.5rem_3.5rem_3.5rem_3.5rem] gap-0.5
        justify-center"
      >
        {orderedInventory &&
          orderedInventory.map((item) =>
            item ? (
              <div
                key={item.item_name}
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
      {currentItem && (
        <div className="flex justify-center">
          <div className="flex flex-col text-center text-xs w-[260px] bg-dark-100 rounded-sm gap-y-1 py-2">
            {currentItem.starforce && currentItem.starforce !== "0" ? (
              <StarCountDisplay starforce={currentItem.starforce} />
            ) : null}
            <div className="font-[800] text-md">{currentItem.soul_option}</div>
            <div className="text-center text-[16px] font-[800]">{`${
              currentItem.item_name
            }${
              currentItem.scroll_upgrade && currentItem.scroll_upgrade !== "0"
                ? `  (+${currentItem.scroll_upgrade})`
                : ""
            }`}</div>
            {currentItem.potential_option_grade && (
              <div className="pb-2 border-dark-150 border-b-[1px] border-dashed">
                {currentItem.potential_option_grade} 아이템
              </div>
            )}
            <div className="flex px-3 py-2 border-dark-150 border-b-[1px] border-dashed">
              <div
                className={`relative flex w-[60px] h-[60px] rounded-md ${getBorderStyle(
                  currentItem.potential_option_grade
                )}`}
              >
                <img
                  src={currentItem.item_icon}
                  alt={currentItem.item_name}
                  className={`absolute } p-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
                />
              </div>
              <div className="flex items-center pl-4">
                {currentItem.item_base_option &&
                  `REQ LEVEL : ${currentItem.item_base_option?.base_equipment_level}`}{" "}
              </div>
            </div>
            <div className="flex flex-col py-2 px-3 items-start text-[11px] border-dark-150 border-b-[1px] border-dashed">
              <div>{`장비 분류 : ${currentItem.item_equipment_part}`}</div>
              {currentItem.item_total_option && (
                <>
                  {renderBasicOption(
                    "STR",
                    currentItem.item_total_option.str,
                    currentItem.item_base_option?.str,
                    currentItem.item_add_option?.str,
                    currentItem.item_etc_option?.str,
                    currentItem.item_starforce_option?.str
                  )}
                  {renderBasicOption(
                    "DEX",
                    currentItem.item_total_option.dex,
                    currentItem.item_base_option?.dex,
                    currentItem.item_add_option?.dex,
                    currentItem.item_etc_option?.dex,
                    currentItem.item_starforce_option?.dex
                  )}
                  {renderBasicOption(
                    "INT",
                    currentItem.item_total_option.int,
                    currentItem.item_base_option?.int,
                    currentItem.item_add_option?.int,
                    currentItem.item_etc_option?.int,
                    currentItem.item_starforce_option?.int
                  )}
                  {renderBasicOption(
                    "LUK",
                    currentItem.item_total_option.luk,
                    currentItem.item_base_option?.luk,
                    currentItem.item_add_option?.luk,
                    currentItem.item_etc_option?.luk,
                    currentItem.item_starforce_option?.luk
                  )}
                  {renderBasicOption(
                    "최대 HP",
                    currentItem.item_total_option.max_hp,
                    currentItem.item_base_option?.max_hp,
                    currentItem.item_add_option?.max_hp,
                    currentItem.item_etc_option?.max_hp,
                    currentItem.item_starforce_option?.max_hp
                  )}
                  {renderBasicOption(
                    "최대 MP",
                    currentItem.item_total_option.max_mp,
                    currentItem.item_base_option?.max_mp,
                    currentItem.item_add_option?.max_mp,
                    currentItem.item_etc_option?.max_mp,
                    currentItem.item_starforce_option?.max_mp
                  )}
                  {renderBasicOption(
                    "공격력",
                    currentItem.item_total_option.attack_power,
                    currentItem.item_base_option?.attack_power,
                    currentItem.item_add_option?.attack_power,
                    currentItem.item_etc_option?.attack_power,
                    currentItem.item_starforce_option?.attack_power
                  )}
                  {renderBasicOption(
                    "마력",
                    currentItem.item_total_option.magic_power,
                    currentItem.item_base_option?.magic_power,
                    currentItem.item_add_option?.magic_power,
                    currentItem.item_etc_option?.magic_power,
                    currentItem.item_starforce_option?.magic_power
                  )}
                  {renderBasicOption(
                    "방어력",
                    currentItem.item_total_option.armor,
                    currentItem.item_base_option?.armor,
                    currentItem.item_add_option?.armor,
                    currentItem.item_etc_option?.armor,
                    currentItem.item_starforce_option?.armor
                  )}
                  {renderBasicOption(
                    "이동속도",
                    currentItem.item_total_option.speed,
                    currentItem.item_base_option?.speed,
                    currentItem.item_add_option?.speed,
                    currentItem.item_etc_option?.speed,
                    currentItem.item_starforce_option?.speed
                  )}
                  {renderBasicOption(
                    "점프력",
                    currentItem.item_total_option.jump,
                    currentItem.item_base_option?.jump,
                    currentItem.item_add_option?.jump,
                    currentItem.item_etc_option?.jump,
                    currentItem.item_starforce_option?.jump
                  )}
                  {renderPercentOption(
                    "보스 공격 시 데미지",
                    currentItem.item_total_option.boss_damage,
                    currentItem.item_base_option?.boss_damage,
                    currentItem.item_add_option?.boss_damage
                  )}
                  {renderPercentOption(
                    "방어력 무시",
                    currentItem.item_total_option.ignore_monster_armor,
                    currentItem.item_base_option?.ignore_monster_armor
                  )}
                  {renderPercentOption(
                    "올스탯",
                    currentItem.item_total_option.all_stat,
                    currentItem.item_base_option?.all_stat,
                    currentItem.item_add_option?.all_stat
                  )}
                  {renderPercentOption(
                    "데미지",
                    currentItem.item_total_option.damage,
                    currentItem.item_add_option?.damage
                  )}
                </>
              )}
              {currentItem.scroll_upgrade !== "0" &&
                currentItem.scroll_upgradeable_count !== "0" &&
                currentItem.scroll_upgradeable_count && (
                  <div className="">
                    <span>{`업그레이드 가능 횟수 : ${currentItem.scroll_upgradeable_count}`}</span>
                    <span className="text-itemoption-starforce">{` (복구 가능 횟수 : ${currentItem.scroll_resilience_count})`}</span>
                  </div>
                )}
              {currentItem.golden_hammer_flag === "적용" && (
                <div>황금망치 제련 적용</div>
              )}
              {currentItem.cuttable_count &&
                currentItem.cuttable_count !== "255" && (
                  <div className="text-itemoption-starforce">{`가위 사용 가능 횟수 : ${currentItem.cuttable_count}회`}</div>
                )}
            </div>
            {currentItem.potential_option_grade && (
              <div className="flex flex-col px-3 text-left text-[11px]">
                <div className="flex items-center gap-x-[2px] ">
                  {getPotentialImg(currentItem.potential_option_grade)}
                  <span
                    className={getPotentialOptionStyles(
                      currentItem.potential_option_grade
                    )}
                  >
                    잠재 옵션
                  </span>
                </div>
                <div>{currentItem.potential_option_1}</div>
                <div>{currentItem.potential_option_2}</div>
                <div>{currentItem.potential_option_3}</div>
              </div>
            )}
            {currentItem.additional_potential_option_grade && (
              <div className="flex flex-col px-3 text-left text-[11px]">
                <div className="flex items-center gap-x-[2px]">
                  {getPotentialImg(
                    currentItem.additional_potential_option_grade
                  )}
                  <span
                    className={`${getPotentialOptionStyles(
                      currentItem.additional_potential_option_grade
                    )}`}
                  >
                    에디셔널 잠재 옵션
                  </span>
                </div>
                <div>{currentItem.additional_potential_option_1}</div>
                <div>{currentItem.additional_potential_option_2}</div>
                <div>{currentItem.additional_potential_option_3}</div>
              </div>
            )}
            {currentItem.item_description && (
              <div className="text-left  px-3 text-[11px]">
                <div className="text-itemoption-starforce">기타</div>
                <div>{currentItem.item_description}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
