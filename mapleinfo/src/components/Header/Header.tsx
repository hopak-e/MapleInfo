import { useEffect } from "react";
import useDarkMode, { useDark } from "../../hooks/useDarkMode";
import useTabBtn, { useTab } from "../../hooks/useTab";
import { Link } from "react-router-dom";

import { ReactComponent as DarkMode } from "../../assets/darkmode.svg";
import { ReactComponent as WhiteMode } from "../../assets/whitemode.svg";
import SearchInput from "../inputs/SearchInput";

interface TabList {
  id: number;
  name: string;
  link: string;
}

const Header = () => {
  const [isDark, onToggleDarkMode]: useDark = useDarkMode();
  const [tab, onToggleTab]: useTab = useTabBtn();

  const tabList: TabList[] = [
    { id: 0, name: "메인", link: "/" },
    { id: 1, name: "길드", link: "/guild" },
    { id: 2, name: "랭킹", link: "/ranking" },
    { id: 3, name: "큐브", link: "/cube" },
    { id: 4, name: "스타포스", link: "/starforce" },
    { id: 5, name: "본캐 찾기", link: "/mainchar" },
    { id: 6, name: "계산기", link: "/calc" },
  ];

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <header className="flex w-screen justify-center dark:bg-dark-100 dark:text-white">
      <div className="flex flex-col w-full max-w-[1200px] ">
        <div className="flex items-center w-full h-16 ">
          <div className="text-xl w-1/6 cursor-pointer">MapleInfo</div>
          <SearchInput placeholder="닉네임을 입력하세요" width="w-2/3" />
          <div className="flex items-center h-full pl-6 w-1/6 ">
            <div
              className="flex items-center  justify-center w-12 h-12 hover:bg-slate-100 dark:hover:bg-white cursor-pointer rounded-full"
              onClick={() => onToggleDarkMode("")}
            >
              {isDark ? <DarkMode /> : <WhiteMode />}
            </div>
          </div>
        </div>
        <div className="flex w-full h-12">
          <ul className="flex w-full h-full px-8">
            {tabList.map((list: TabList) => (
              <Link
                to={list.link}
                key={list.id}
                className="flex grow h-full cursor-pointer"
              >
                <li
                  className={`flex grow items-center h-full 
                ${
                  list.name === tab
                    ? "border-black border-b-4 dark:border-white "
                    : ""
                }`}
                  onClick={() => onToggleTab(list.name)}
                >
                  <span className="w-full text-center hover:bg-slate-100 hover:rounded-md dark:hover:bg-dark-250 ">
                    {list.name}
                  </span>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
