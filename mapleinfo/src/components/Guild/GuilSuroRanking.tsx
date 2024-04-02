import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GuildApiService from "services/GuildApiService";
import { Guild } from "types/guild";
import { worldTypes } from "./constants";

const GuildSuroRanking = () => {
  const [worldSuro, setWorldSuro] = useState<Guild[]>();

  const getWeekMondayAndSunday = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    let lastMonday, lastSunday;

    const diff = dayOfWeek - 1;

    lastMonday = new Date(today);
    lastMonday.setDate(today.getDate() - diff - 7);

    lastSunday = new Date(lastMonday);
    lastSunday.setDate(lastMonday.getDate() + 6);

    const mondayFormatted = `${lastMonday.getFullYear()}-${String(
      lastMonday.getMonth() + 1
    ).padStart(2, "0")}-${String(lastMonday.getDate()).padStart(2, "0")}`;
    const SundayFormatted = `${lastSunday.getFullYear()}-${String(
      lastSunday.getMonth() + 1
    ).padStart(2, "0")}-${String(lastSunday.getDate()).padStart(2, "0")}`;

    return { mondayDate: mondayFormatted, sundayDate: SundayFormatted };
  };

  const { mondayDate, sundayDate } = getWeekMondayAndSunday();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const worldArr = worldTypes.slice(1, worldTypes.length - 1);
        const result: Guild[] = [];

        for (const world of worldArr) {
          const guildData = await GuildApiService.fetchRankingData(
            sundayDate,
            world,
            2
          );
          if (guildData.ranking && guildData.ranking.length > 0) {
            const guildId = await GuildApiService.fetchGuildId(
              guildData.ranking[0].guild_name,
              guildData.ranking[0].world_name
            );
            const guildImg = await GuildApiService.fetchGuildImgUrl(guildId);

            guildData.ranking[0].guild_mark = guildImg.guild_mark;
            guildData.ranking[0].guild_mark_custom = guildImg.guild_mark_custom;

            const guildMemberCount = await GuildApiService.fetchGuilMemberCount(
              guildId
            );
            guildData.ranking[0].guild_member_count = guildMemberCount;

            result.push(guildData.ranking[0]);
          }
        }
        setWorldSuro(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [sundayDate]);

  return (
    <div className="flex flex-col">
      <div className="text-lg font-[600]">월드별 수로 1등 길드</div>
      <div className="text-[12px] ">{`기간 ${mondayDate} ~ ${sundayDate}`}</div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-5">
        {worldSuro &&
          worldSuro.map((guild) => (
            <Link to={`/guild/${guild.world_name}/${guild.guild_name}`}>
              <div
                className=" min-w-[140px] px-3 py-2 rounded-sm bg-dark-200"
                key={guild.guild_master_name}
              >
                <div className="flex items-center gap-x-1">
                  <img
                    src={
                      guild.guild_mark
                        ? guild.guild_mark
                        : `data:image/png;base64,${guild.guild_mark_custom}`
                    }
                    alt={guild.guild_master_name}
                    className="w-4 h-4"
                  />
                  <div>
                    <span className="">{guild.guild_name}</span>
                    <span className="text-[10px] ml-1">{`Lv${guild.guild_level}`}</span>
                  </div>
                  <img
                    src={require(`assets/worldLogo/${guild.world_name}.png`)}
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

export default GuildSuroRanking;
