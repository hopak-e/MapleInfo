import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as SearchIcon } from "../../assets/search.svg";

interface SearchInputProps {
  placeholder: string;
  width?: string;
}

const SearchInput = ({ placeholder, width }: SearchInputProps) => {
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
  //onkeydown => onkeyup 영문과 한글은 입력 처리방식 달라서 onkeyup을 사용
  return (
    <div className={`relative ${width}`}>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onKeyUp={handleKeyUp}
        className="grow border-2 border-black  pl-4 py-2 rounded-lg  focus:border-gray-300 w-full h-12 dark:bg-dark-250 dark:text-black"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 ">
        <SearchIcon
          fill="#000"
          cursor="pointer"
          className="w-8"
          onClick={handleSearch}
        />
      </div>
    </div>
  );
};

export default SearchInput;
