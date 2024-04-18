import { useState, useEffect } from "react";
import { CharBasicData } from "types/char";
import CharApiService from "services/CharApiService";
import { Link } from "react-router-dom";
import Loading from "components/Loading/Loading";
import Error from "components/Error/Error";
interface TrackedCharProps {
  nickName?: string;
}
const TrackedChar = ({ nickName }: TrackedCharProps) => {
  const [mainCharInfo, setMainCharInfo] = useState<CharBasicData>();
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (nickName) {
          const ocid = await CharApiService.fetchOcidData(nickName);
          const unionRes = await CharApiService.fetchUnionData(ocid);
          const mainCharNickName = unionRes.ranking[0].character_name;

          const mainCharOcid = await CharApiService.fetchOcidData(
            mainCharNickName
          );
          const mainCharData = await CharApiService.fetchBasicCharacterData(
            mainCharOcid
          );
          setMainCharInfo(mainCharData);
          setError(null);
        }
      } catch (error) {
        console.error("fetching error");
        setError("캐릭터 이름을 다시 한 번 확인해주세요.");
      }
    };
    fetchData();
  }, [nickName]);

  return (
    <div>
      <div className="border-t pt-5">{`${nickName}의 본캐 찾기 결과`}</div>
      {error ? (
        <Error state={error} />
      ) : mainCharInfo ? (
        <Link to={`/char/${mainCharInfo.character_name}`}>
          <div className="flex flex-col items-center py-2 border-[0.5px] border-dark-150 dark:border-none dark:bg-dark-250 shadow-md cursor-pointer">
            <div>
              <img
                src={mainCharInfo.character_image}
                alt={mainCharInfo.character_name}
                className="w-[60px] h-[60px] sm:w-[96px] sm:h-[96px]"
              />
            </div>
            <div className="text-[11px]">{mainCharInfo.world_name}</div>
            <div className="flex items-center gap-x-0.5 text-lg font-[700]">
              <img
                src={require(`assets/worldLogo/${mainCharInfo.world_name}.png`)}
                alt={mainCharInfo.world_name}
                className="w-4 h-4"
              />
              <span>{mainCharInfo.character_name}</span>
            </div>
            <div>
              <span className="text-[11px]">{`Lv.${mainCharInfo.character_level} `}</span>
              <span>{mainCharInfo.character_class}</span>
            </div>
            <div>{`길드 ${mainCharInfo.character_guild_name}`}</div>
            <div>{`유니온 ${mainCharInfo.union_level}`}</div>
          </div>
        </Link>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default TrackedChar;
