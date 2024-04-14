import { useState, useEffect } from "react";
import CharApiService from "services/CharApiService";
import GuildApiService from "services/GuildApiService";
import CharImage from "./CharImage";
import CharBasic from "./CharBasic";
import CharStat from "./CharStat";
import CharEquipment from "./CharEquipment/CharEquipment";
import CharVmatrix from "./CharVmatrix";
import CharHexaMatrix from "./CharHexaMatrix";
import { CharBasicData, ListOfFavorite } from "types/char";
import { GuilImg } from "types/guild";
import Star from "assets/star.svg";
import GrayStar from "assets/graystar.svg";

interface CharProps {
  value: string | undefined;
}

const Char = ({ value }: CharProps) => {
  const [ocid, setOcid] = useState<string>("");
  const [charBasicData, setCharBasicData] = useState<CharBasicData>();
  const [guildImgUrl, setGuildImgUrl] = useState<GuilImg>();
  const [favorites, setFavorites] = useState<ListOfFavorite[]>();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    const favorites = localStorage.getItem("listOfFavorite");
    if (favorites) {
      const listOfFavorites: ListOfFavorite[] = JSON.parse(favorites);
      setFavorites(listOfFavorites);
      if (listOfFavorites.find((list) => list.charName === value))
        setIsFavorite(true);
    }
  }, [value]);

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

  const handleFavoriteClick = () => {
    if (favorites) {
      if (isFavorite) {
        const filteredData = favorites.filter(
          (item) => item.charName !== value
        );
        localStorage.setItem("listOfFavorite", JSON.stringify(filteredData));
        setIsFavorite(false);
        setFavorites(filteredData);
      } else {
        if (favorites.length >= 5) {
          alert("즐겨찾기는 최대 5명까지만 가능합니다");
        } else if (value) {
          const newData = { charName: value };
          const data = [...favorites, newData];
          localStorage.setItem("listOfFavorite", JSON.stringify(data));
          setIsFavorite(true);
          setFavorites(data);
        }
      }
    } else {
      if (value) {
        const newFavorite = [{ charName: value }];
        localStorage.setItem("listOfFavorite", JSON.stringify(newFavorite));
        setIsFavorite(true);
        setFavorites(newFavorite);
      }
    }
  };

  return (
    <div className="grow w-full max-w-[1120px] mx-auto  space-y-3 shrink-0 p-3">
      {charBasicData && (
        <div className="grid grid-cols-1 gap-3 w-full md:grid-cols-[250px_1fr]">
          <div className="grow-0 shrink-0 basis-[250px] space-y-3 ">
            <div className="bg-dark-200 text-white rounded-sm shadow-sm">
              <div className="relative flex w-full items-center justify-center flex-wrap pt-5 gap-x-2 sm:gap-x-8 md:gap-x-0">
                <div className="absolute top-2 left-2 p-1 border-[0.5px] rounded-md cursor-pointer hover:bg-dark-250">
                  <img
                    src={isFavorite ? Star : GrayStar}
                    alt="favorite"
                    className="w-6 h-6"
                    onClick={handleFavoriteClick}
                  />
                </div>
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
