import { useState, useEffect } from "react";
import useDarkMode, { useDark } from "../../hooks/useDarkMode";
import useTabBtn, { useTab } from "../../hooks/useTab";

import { ReactComponent as Search } from "../../assets/search.svg";
import { ReactComponent as DarkMode } from "../../assets/darkmode.svg";
import { ReactComponent as WhiteMode } from "../../assets/whitemode.svg";

interface TabList {
  id: number;
  name: string;
}

const Header = () => {
  const [nickname, setNickname] = useState("");
  const [isDark, onToggleDarkMode]: useDark = useDarkMode();
  const [tab, onToggleTab]: useTab = useTabBtn();

  const tabList: TabList[] = [
    { id: 0, name: "메인" },
    { id: 1, name: "길드" },
    { id: 2, name: "랭킹" },
    { id: 3, name: "큐브" },
    { id: 4, name: "스타포스" },
    { id: 5, name: "본캐 찾기" },
    { id: 6, name: "계산기" },
  ];

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  return (
    <>
      <div className="flex items-center w-full h-24">
        <div className="text-xl w-1/6">MapleInfo</div>
        <div className="relative w-2/3">
          <input
            type="text"
            value={nickname}
            placeholder="닉네임을 입력하세요"
            onChange={onChange}
            className="grow border-2 border-black  pl-4 py-2 rounded-lg  focus:border-gray-300 w-full h-14"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 ">
            <Search fill="#000" cursor="pointer" className="w-8" />
          </div>
        </div>
        <div className="flex items-center p-2 pl-4 w-1/6">
          {isDark ? (
            <DarkMode
              onClick={() => onToggleDarkMode("")}
              cursor="pointer"
              className="w-12"
            />
          ) : (
            <WhiteMode
              onClick={() => onToggleDarkMode("")}
              cursor="pointer"
              className="w-12"
            />
          )}
        </div>
      </div>
      <div className="flex items-center w-full h-12">
        <ul className="flex w-full h-full px-8">
          {tabList.map((list: TabList) => (
            <li
              key={list.id}
              className={`flex grow justify-center items-center px-4 h-full cursor-pointer 
                ${list.name === tab ? "border-b-2" : ""}`}
              onClick={() => onToggleTab(list.name)}
            >
              {list.name}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Header;
