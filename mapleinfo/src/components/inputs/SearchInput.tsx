import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DarkModeSearch from "assets/darkLightMode/darkModeSearch.svg";
import LightModeSearch from "assets/darkLightMode/lightModeSearch.svg";

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
    <div className={`relative grow shrink w-[280px] ${width} `}>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onKeyUp={handleKeyUp}
        className="grow pl-3 py-1 border border-black dark:border-none bg-white dark:bg-dark-250 rounded-lg focus:border-gray-300 w-full "
      />
      <div className="absolute inset-y-0 right-3 flex items-center min-w-3">
        <img
          src={isDark ? DarkModeSearch : LightModeSearch}
          className="w-4 h-4 md:w-6 md:h-6 fill-white stroke-white"
          onClick={handleSearch}
          alt="search-icon"
        />
      </div>
    </div>
  );
};

export default SearchInput;
