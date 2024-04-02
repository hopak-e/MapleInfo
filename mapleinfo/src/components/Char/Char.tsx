import { useState, useEffect } from "react";
import CharApiService from "services/CharApiService";
import GuildApiService from "services/GuildApiService";
import CharImage from "./CharImage";
import CharBasic from "./CharBasic";
import CharStat from "./CharStat";
import CharEquipment from "./CharEquipment/CharEquipment";
import CharVmatrix from "./CharVmatrix";
import CharHexaMatrix from "./CharHexaMatrix";
import { CharBasicData } from "../../types/char";
import { GuilImg } from "types/guild";

interface CharProps {
  value: string | undefined;
}

const Char = ({ value }: CharProps) => {
  const [ocid, setOcid] = useState<string>("");
  const [charBasicData, setCharBasicData] = useState<CharBasicData>();
  const [guildImgUrl, setGuildImgUrl] = useState<GuilImg>();

  //cec4b57b2ce3968a328d5e9c14ed72f7 호팍팍팍팍
  //e0a4f439e53c369866b55297d2f5f4eb 아델
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ocid: string = await CharApiService.fetchOcidData(value);
        setOcid(ocid);
        const basicData: CharBasicData =
          await CharApiService.fetchBasicCharacterData(ocid);
        setCharBasicData(basicData);

        if (basicData.character_guild_name !== null) {
          const oguildId: string = await GuildApiService.fetchGuildId(
            basicData.character_guild_name,
            basicData.world_name
          );
          const guildImgUrl: GuilImg = await GuildApiService.fetchGuildImgUrl(
            oguildId
          );
          setGuildImgUrl(guildImgUrl);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [value]);

  return (
    <div className="grow w-full max-w-[1120px] mx-auto  space-y-3 shrink-0 p-3">
      {charBasicData && (
        <div className="grid grid-cols-1 gap-3 w-full md:grid-cols-[250px_1fr]">
          <div className="grow-0 shrink-0 basis-[250px] space-y-3 ">
            <div className="bg-dark-200 text-white rounded-sm shadow-sm">
              <div className="flex w-full items-center justify-center flex-wrap pt-5 gap-x-2 sm:gap-x-8 md:gap-x-0">
                <CharImage
                  imageUrl={charBasicData.character_image}
                  altText={charBasicData.character_name}
                />
                <CharBasic
                  charBasicData={charBasicData}
                  guildImgUrl={guildImgUrl}
                />
              </div>
            </div>
            <div className="bg-dark-200 text-white rounded-sm shadow-sm p-2">
              <CharStat stat={charBasicData.final_stat} ocid={ocid} />
            </div>
          </div>
          <div className="grow shrink space-y-2">
            <CharEquipment
              ocid={ocid}
              charClass={charBasicData.character_class}
            />
            <CharHexaMatrix ocid={ocid} />
            <CharVmatrix ocid={ocid} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Char;
