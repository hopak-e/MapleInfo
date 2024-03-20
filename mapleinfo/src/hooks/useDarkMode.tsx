import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../modules/index";
import { toggleDarkMode } from "../modules/darkSlice";

export type useDark = [boolean, (text: string) => void];

const useDarkMode = (): useDark => {
  const isDark = useSelector((state: RootState) => state.dark.isDark);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme:dark").matches)
    ) {
      document.documentElement.classList.add("dark");
    }
  }, [isDark]);

  const onToggleDarkMode = (text: string): void => {
    dispatch(toggleDarkMode(text));
  };

  return [isDark, onToggleDarkMode];
};

export default useDarkMode;
