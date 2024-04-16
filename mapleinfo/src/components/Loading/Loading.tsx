import Spinner from "assets/spinner.gif";

const Loading = () => {
  return (
    <div className="flex m-auto min-h-[280px] items-center justify-center">
      <div className="flex flex-col items-center">
        <h2>데이터를 불러오는 중입니다.</h2>
        <img src={Spinner} alt="spinner" className="w-24 h-24" />
      </div>
    </div>
  );
};
export default Loading;
