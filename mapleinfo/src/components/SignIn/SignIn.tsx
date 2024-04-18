import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CubeApiService from "services/CubeApiService";
import formatDate from "utils/dateUtils/formatDate";

interface SignInProps {
  type: string;
}

const SignIn = ({ type }: SignInProps) => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [inputApiKey, setInputApiKey] = useState<string>();
  const [isValid, setIsValid] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const key = localStorage.getItem("api-key");
    if (key) {
      setApiKey(key);
    }
  }, []);

  const formatApiKey = (apiKey: string) => {
    if (!apiKey) return "";
    const key = JSON.parse(apiKey);
    if (key !== undefined) {
      const visiblePart = key.substring(0, 9);
      const hiddenPart = key.substring(9).replace(/.{4}/g, "*");
      const maskedString = visiblePart + hiddenPart;
      return maskedString;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputApiKey(e.target.value);
  };

  const handleSignIn = () => {
    if (inputApiKey && inputApiKey.length > 0) {
      const validFetch = async () => {
        try {
          const today = formatDate(new Date());
          await CubeApiService.fetchCubeData(inputApiKey, today, null);
          localStorage.removeItem("api-key");
          localStorage.setItem("api-key", JSON.stringify(inputApiKey));
          navigate(`/${type === "큐브" ? "cube" : "starforce"}/result`);
          setIsValid(true);
        } catch (error) {
          setIsValid(false);
        }
      };
      validFetch();
    }
    setIsValid(false);
  };

  const handleInputKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSignIn();
    }
  };

  const handleSignInBtnClick = () => {
    handleSignIn();
  };

  const handleLastApiKeyClick = async () => {
    navigate(`/${type === "큐브" ? "cube" : "starforce"}/result`);
  };

  return (
    <div className="grow">
      <div className="max-w-[500px] mx-auto text-center space-y-3 mt-10 px-4">
        <div className="font-[700] text-[32px]">{`${type} 히스토리`}</div>
        <div>
          <div
            className={`py-2 px-1 border ${
              isValid ? "border-dark-150" : "border-red-600"
            } rounded-md`}
          >
            <input
              placeholder="API Key를 입력하세요."
              className="pl-1 w-full whitespace-nowrap"
              value={inputApiKey}
              onChange={handleInputChange}
              onKeyUp={handleInputKeyUp}
            />
          </div>
          {!isValid && (
            <div className="text-[12px] mt-1 text-start text-red-600">
              올바른 API key를 입력해주세요
            </div>
          )}
        </div>
        <div>
          <button
            className="w-full py-2 px-1 text-white dark:text-dark-50 bg-dark-200 dark:bg-dark-150 rounded-md"
            onClick={handleSignInBtnClick}
          >
            로그인
          </button>
        </div>
        <div className="text-grade-200">
          <Link to="/help">
            <span>API key 발급 가이드</span>
          </Link>
        </div>
        <div>
          <div className="flex text-start">API key 선택</div>
          <div>
            {apiKey && (
              <button
                className="w-full py-2 px-1 text-white dark:text-dark-50 bg-dark-200 dark:bg-dark-150 rounded-md"
                onClick={handleLastApiKeyClick}
              >
                {formatApiKey(apiKey)}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
