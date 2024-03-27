import { CharBasicData } from "../../types/char";

interface CharBasicDataProps {
  charBasicData: CharBasicData;
  guildImgUrl: string | undefined;
}

const CharBasic = ({ charBasicData, guildImgUrl }: CharBasicDataProps) => {
  const powerValue =
    charBasicData &&
    charBasicData.final_stat[42].stat_value.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ","
    );

  return (
    <div className="space-y-1 text-sm ">
      <div className="text-2xl font-[700] text-center mt-2">
        {charBasicData.character_name}
      </div>
      <div className="flex justify-center text-sm">
        <div className="flex items-center px-2 py-1 rounded-xl bg-dark-250">
          <img
            src={require(`../../assets/worldLogo/${charBasicData.world_name}.png`)}
            alt={charBasicData.world_name}
            className="w-4 h-4 mr-1"
          />
          <span>{charBasicData.world_name}</span>
        </div>
        <div className="flex px-2 py-1 rounded-xl ml-2 bg-dark-250 items-center">
          {guildImgUrl && (
            <img
              src={`data:image/png;base64,${guildImgUrl}`}
              alt="길드마크"
              className="w-[14px] h-[14px]"
            />
          )}
          <div className="pl-1">{charBasicData.character_guild_name}</div>
        </div>
      </div>
      <div className="flex flex-col gap-y-1 items-center text-sm">
        <div className="flex gap-x-1">
          <span>{charBasicData.character_class}</span>
          <span>Lv.{charBasicData.character_level}</span>
        </div>
        <div className="flex gap-x-1">
          <span>인기도</span>
          <span>{charBasicData.character_popularity}</span>
        </div>
        <div className="flex gap-x-1">
          <span>유니온</span>
          <span>{charBasicData.union_level}</span>
        </div>
        <div className="flex gap-x-1">
          <span>종합랭킹</span>
          <span>{charBasicData.total_ranking}</span>
          <span>월드랭킹</span>
          <span>{charBasicData.world_ranking}</span>
        </div>
        <div className="flex">
          <div className="flex mt-3 pb-2 flex-col">
            <div className="flex font-[600] justify-center">전투력</div>
            <div className="flex font-[900] text-xl">{powerValue}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharBasic;
