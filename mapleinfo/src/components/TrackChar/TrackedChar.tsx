import { useState, useEffect } from "react";
import TrackCharInput from "./TrackCharInput";
import TrackChar from "./TrackChar";
import { CharBasicData } from "types/char";
import CharApiService from "services/CharApiService";
import { Link, useParams } from "react-router-dom";

const TrackedChar = () => {
  const { nickName } = useParams<string>();
  const [mainCharInfo, setMainCharInfo] = useState<CharBasicData>();
  //유니온 랭킹 조회 검색 2023-12-21기준
  //부캐 ocid
  //나온 본캐 기본정보 img 월드 닉네임 레벨 길드 유니온
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
        }
      } catch (error) {
        console.error("fetching error");
      }
    };
    fetchData();
  }, []);
  console.log(mainCharInfo);

  return (
    <div className="max-w-[1120px] mx-auto">
      <TrackChar />
      <div className="border-t pt-5">{`${nickName}의 본캐 찾기 결과`}</div>
      {mainCharInfo && (
        <Link to={`/char/${mainCharInfo.character_name}`}>
          <div className="flex flex-col items-center bg-dark-250 py-2 cursor-pointer">
            <div>
              <img
                src={mainCharInfo.character_image}
                alt={mainCharInfo.character_name}
                className="w-[60px] h-[60px] sm:w-[96px] sm:h-[96px]"
              />
            </div>
            <div className="text-[11px]">{mainCharInfo.world_name}</div>
            <div className="flex items-center gap-x-0.5 text-lg font-[800]">
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
      )}
    </div>
  );
};

export default TrackedChar;
