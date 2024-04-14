import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DarkModeSearch from "assets/darkModeSearch.svg";
import WhiteModeSearch from "assets/whiteModeSearch.svg";

interface SearchInputProps {
  placeholder: string;
  width?: string;
  isDark: boolean;
}

const SearchInput = ({ placeholder, width, isDark }: SearchInputProps) => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSearch = () => {
    const trimmedValue = value.trim();
    if (trimmedValue !== "") {
      navigate(`/char/${encodeURIComponent(value)}`);
      setValue("");
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={`relative grow min-w-[180px] ${width} `}>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onKeyUp={handleKeyUp}
        className="grow border-1 border-black  pl-3 py-1 rounded-lg focus:border-gray-300 w-full dark:bg-dark-250"
      />
      <div className="absolute inset-y-0 right-3 flex items-center min-w-3">
        <img
          src={isDark ? DarkModeSearch : WhiteModeSearch}
          className="w-4 h-4 md:w-6 md:h-6 fill-white stroke-white"
          onClick={handleSearch}
          alt="search-icon"
        />
      </div>
    </div>
  );
};

export default SearchInput;
