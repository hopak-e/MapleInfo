import { SetStateAction } from "react";

interface ItemCharacterPair {
  target_item: string;
  character_name: string;
}

const filterHistory = <T extends ItemCharacterPair>(
  item: string,
  character: string,
  history: T[],
  setState: React.Dispatch<SetStateAction<T[] | null>>
) => {
  if (item === "모든 장비" && character === "모든 캐릭터") {
    setState(history);
  } else if (item !== "모든 장비" && character === "모든 캐릭터") {
    const newItemList = history.filter((el) => el.target_item === item);
    setState(newItemList);
  } else if (item === "모든 장비" && character !== "모든 캐릭터") {
    const newItemList = history.filter((el) => el.character_name === character);
    setState(newItemList);
  } else {
    const newItemList = history
      .filter((el) => el.target_item === item)
      .filter((el) => el.character_name === character);
    setState(newItemList);
  }
};

export default filterHistory;
