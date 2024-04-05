import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TrackCharInput = () => {
  const [nickName, setNickName] = useState<string>("");
  const navigate = useNavigate();

  const handleNickNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };

  const handleNickNameSearch = () => {
    navigate(`/trackChar/${encodeURIComponent(nickName)}`);
  };

  const handleNicknameKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleNickNameSearch();
    }
  };

  return (
    <div className="relative bg-dark-200 p-2 mt-2 max-w-[400px] rounded-sm">
      <div className="flex items-center text-[13px] gap-x-2">
        <input
          placeholder="닉네임을 입력하세요"
          type="text"
          value={nickName}
          className="w-[280px]"
          onChange={handleNickNameInput}
          onKeyUp={handleNicknameKeyUp}
        />
      </div>
    </div>
  );
};

export default TrackCharInput;
