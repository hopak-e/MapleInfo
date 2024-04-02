import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GuildApiService from "services/GuildApiService";
import { Guild } from "types/guild";

interface GuildSearchResultProps {
  worldName: string | undefined;
  guildName: string | undefined;
}

const GuildSearchResult = ({
  worldName,
  guildName,
}: GuildSearchResultProps) => {
  const [searchedGuildList, setSearchedGuildList] = useState<Guild[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (worldName && guildName) {
          const searchedGuildData = await GuildApiService.fetchGuildSearchData(
            worldName,
            guildName
          );
          if (searchedGuildData) {
            for (const guild of searchedGuildData.ranking) {
              const guildId = await GuildApiService.fetchGuildId(
                guild.guild_name,
                guild.world_name
              );
              const guildImg = await GuildApiService.fetchGuildImgUrl(guildId);
              guild.guild_mark = guildImg.guild_mark;
              guild.guild_mark_custom = guildImg.guild_mark_custom;
              const guildMemberCount =
                await GuildApiService.fetchGuilMemberCount(guildId);
              guild.guild_member_count = guildMemberCount;
            }
          }
          setSearchedGuildList(searchedGuildData.ranking);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [worldName, guildName]);
  console.log(searchedGuildList);
  return (
    <div className="flex flex-col">
      <div className="text-lg font-[600]">{guildName}길드 검색 결과</div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-5">
        {searchedGuildList &&
          searchedGuildList.map((guild) => (
            <Link to={`/guildDetail/${guild.world_name}/${guild.guild_name}`}>
              <div
                className=" min-w-[140px] px-3 py-2 rounded-sm bg-dark-200"
                key={guild.guild_master_name}
              >
                <div className="flex items-center gap-x-1">
                  {!guild.guild_mark && !guild.guild_mark_custom ? null : (
                    <img
                      src={
                        guild.guild_mark
                          ? guild.guild_mark
                          : `data:image/png;base64,${guild.guild_mark_custom}`
                      }
                      alt={guild.guild_master_name}
                      className="w-4 h-4"
                    />
                  )}

                  <div>
                    <span className="">{guild.guild_name}</span>
                    <span className="text-[10px] ml-1">{`Lv${guild.guild_level}`}</span>
                  </div>
                  <img
                    src={require(`../../assets/worldLogo/${guild.world_name}.png`)}
                    alt={guild.world_name}
                    className="w-4 h-4 ml-auto"
                  />
                </div>
                <div className="text-[12px]">
                  <span>마스터</span>
                  <span className="ml-1">{guild.guild_master_name}</span>
                </div>
                <div className="text-[12px]">
                  <span>인원</span>
                  <span className="ml-1">{guild.guild_member_count}</span>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default GuildSearchResult;
