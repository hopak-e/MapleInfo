import GuildInput from "./GuildInput";

const GuildSearch = () => {
  return (
    <div className="flex flex-col gap-y-3 items-center py-10">
      <div className="font-[800] text-[20px]">길드 검색</div>
      <div className="text-[14px]">
        2023.12.21일 이후 접속한 캐릭터 및 길드만 조회 가능합니다.
      </div>
      <GuildInput worldName="전체월드" guildName="" />
    </div>
  );
};

export default GuildSearch;
