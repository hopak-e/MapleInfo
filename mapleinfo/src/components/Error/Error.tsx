import ErrorIcon from "assets/erroricon.png";
import { Link, useNavigate } from "react-router-dom";

interface ErrorProps {
  state: string;
}

const Error = ({ state }: ErrorProps) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col max-w-[1120px] py-6 w-full mx-auto items-center justify-center border shadow-md mt-4">
      <div className="flex items-center gap-x-2">
        <img src={ErrorIcon} alt="erroricon" />
        <div>
          <div className="font-[700]">검색 결과가 없습니다.</div>
          <div>{state}</div>
        </div>
      </div>
      <div className="flex gap-x-2 mt-2">
        <div>
          <Link to="/">
            <button className="p-2 bg-dark-300 dark:bg-dark-200 rounded-md">
              메인으로
            </button>
          </Link>
        </div>
        <div>
          <button
            className="p-2 bg-dark-300 dark:bg-dark-200 rounded-md"
            onClick={handleBackClick}
          >
            뒤로
          </button>
        </div>
      </div>
    </div>
  );
};
export default Error;
