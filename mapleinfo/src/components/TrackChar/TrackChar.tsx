import TrackCharInput from "./TrackCharInput";

const TrackChar = () => {
  return (
    <div className="flex flex-col gap-y-3 items-center py-10">
      <div className="font-[800] text-[20px]">본캐 찾기</div>
      <div className="text-[14px]">
        2023.12.21일 이후 접속한 캐릭터만 조회 가능합니다.
      </div>
      <TrackCharInput />
    </div>
  );
};

export default TrackChar;
