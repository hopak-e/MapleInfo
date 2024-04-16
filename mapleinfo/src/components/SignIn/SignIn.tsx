import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface SignInProps {
  type: string;
}

const SignIn = ({ type }: SignInProps) => {
  const [formmatedApiKey, setFormattedApiKey] = useState<string>();
  const [inputApiKey, setInputApiKey] = useState<string>();

  useEffect(() => {
    const apiKey = localStorage.getItem("api-key");
    if (apiKey) {
      const hi = JSON.parse(apiKey);
      const visiblePart = hi.substring(0, 9);
      const hiddenPart = hi.substring(9).replace(/.{4}/g, "*");
      const maskedString = visiblePart + hiddenPart;
      setFormattedApiKey(maskedString);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputApiKey(e.target.value);
  };

  const handleSignIn = () => {
    localStorage.removeItem("api-key");
    localStorage.setItem("api-key", JSON.stringify(inputApiKey));
  };

  return (
    <div className="grow">
      <div className="max-w-[500px] mx-auto text-center space-y-3 mt-10 px-4">
        <div className="font-[700] text-[32px]">{`${type} 히스토리`}</div>
        <div className="py-2 px-1 border border-dark-150  rounded-md">
          <input
            placeholder="API Key를 입력하세요."
            className="pl-1 w-full whitespace-nowrap"
            value={inputApiKey}
            onChange={handleInputChange}
          />
        </div>
        <div className="">
          <button className="w-full py-2 px-1 text-white dark:text-dark-50 bg-dark-200 dark:bg-dark-150 rounded-md">
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
            <button className="w-full py-2 px-1 text-white dark:text-dark-50 bg-dark-200 dark:bg-dark-150 rounded-md">
              {formmatedApiKey}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
