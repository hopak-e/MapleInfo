import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../modules/index";
import { toggleTab } from "../modules/tabSlice";

export type useTab = [string, (text: string) => void];

const useTabBtn = (): useTab => {
  const tab = useSelector((state: RootState) => state.tab.tab);
  const dispatch = useDispatch();

  const onToggleTab = (text: string): void => {
    dispatch(toggleTab(text));
  };

  return [tab, onToggleTab];
};

export default useTabBtn;
