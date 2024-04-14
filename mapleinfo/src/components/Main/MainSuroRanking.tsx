import { useEffect, useState } from "react";
import GuildApiService from "services/GuildApiService";
import formatDate from "utils/dateUtils/formatDate";
import { Guild } from "types/guild";
import { Link } from "react-router-dom";

const MainSuroRanking = () => {
  const [suroRank, setSuroRank] = useState<Guild[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const today = formatDate(new Date());

        const suroRes = await GuildApiService.fetchRankingData(today, 2);
        const topTenSuroRes = suroRes.ranking.slice(0, 10);

        const resultPromises = topTenSuroRes.map(async (guild) => {
          const guildId = await GuildApiService.fetchGuildId(
            guild.guild_name,
            guild.world_name
          );
          const guildImg = await GuildApiService.fetchGuildImgUrl(guildId);
          guild.guild_mark = guildImg.guild_mark;
          guild.guild_mark_custom = guildImg.guild_mark_custom;
          return guild;
        });
        const formattedSuroRes = await Promise.all(resultPromises);
        setSuroRank(formattedSuroRes);
      } catch (error) {
        console.error("fetching error:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col dark:bg-dark-250 gap-y-0.5 p-2 rounded-md">
      <div className="pl-1 py-1 border-b-[0.5px]">길드 수로 랭킹</div>
      <div className="flex flex-col gap-y-2 text-[12px] pt-1">
        {suroRank &&
          suroRank.map((guild) => (
            <Link to={`/guildDetail/${guild.world_name}/${guild.guild_name}`}>
              <div
                key={guild.ranking}
                className="grid grid-cols-[1.4em_auto_1fr_auto] items-center gap-x-0.5 hover:bg-dark-200 cursor-pointer"
              >
                <div className="text-center">{guild.ranking}</div>
                <div className="flex items-center gap-x-1">
                  <img
                    src={
                      guild.guild_mark
                        ? guild.guild_mark
                        : `data:image/png;base64,${guild.guild_mark_custom}`
                    }
                    alt={guild.guild_name}
                    className="w-4 h-4"
                  />
                  <div>{guild.guild_name}</div>
                </div>
                <div></div>
                <div className="flex items-center gap-x-1">
                  <img
                    src={require(`assets/worldLogo/${guild.world_name}.png`)}
                    className="w-4 h-4"
                    alt={guild.world_name}
                  />
                  <div className="">{`${guild.guild_point.toLocaleString(
                    "ko-KR"
                  )}점`}</div>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default MainSuroRanking;
