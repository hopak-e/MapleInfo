import { useState, useEffect } from "react";
import { CharBasicData } from "types/char";
import CharApiService from "services/CharApiService";
import { CubeHistory } from "types/cube";

interface StarForceMainCharProps {
  cubeHistory: CubeHistory[] | undefined;
}

const CubeMainChar = ({ cubeHistory }: StarForceMainCharProps) => {
  const [mainCharInfo, setMainCharInfo] = useState<CharBasicData>();

  useEffect(() => {
    if (cubeHistory) {
      const fetchData = async () => {
        try {
          const findMainChar = cubeHistory[0] && cubeHistory[0].character_name;
          if (findMainChar) {
            const ocidRes = await CharApiService.fetchOcidData(findMainChar);
            const unioinRes = await CharApiService.fetchUnionData(ocidRes);
            const mainCharNickName = unioinRes.ranking[0].character_name;
            const mainCharOcid = await CharApiService.fetchOcidData(
              mainCharNickName
            );
            const mainCharData = await CharApiService.fetchBasicCharacterData(
              mainCharOcid
            );
            setMainCharInfo(mainCharData);
          }
        } catch (error) {
          console.error("fetching error", error);
        }
      };

      fetchData();
    }
  }, [cubeHistory]);

  return (
    <div className="flex justify-between items-center pt-4 pb-2 border-b ">
      {mainCharInfo && (
        <div className="flex gap-x-2">
          <div className="flex items-center">
            <img
              src={require(`assets/worldLogo/${mainCharInfo.world_name}.png`)}
              alt={mainCharInfo.world_name}
              className="w-6 h-6"
            />
            <span className="text-lg">{mainCharInfo.character_name}</span>
          </div>
          <div className="flex items-end text-[11px] pb-1 gap-x-0.5">
            <span>{`Lv.${mainCharInfo.character_level}`}</span>
            <span>{`| ${mainCharInfo.character_class}`}</span>
            <span>{`| ${mainCharInfo.character_guild_name}`}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CubeMainChar;
