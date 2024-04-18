import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GuildApiService from "services/GuildApiService";
import { Guild } from "types/guild";
import { worldTypes } from "./constants";
import Loading from "components/Loading/Loading";

const GuilFirstSuroOfWolrd = () => {
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

        const resultPromises = worldArr.map(async (world) => {
          const guildData = await GuildApiService.fetchRankingData(
            sundayDate,
            2,
            world
          );
          const firstGuild = guildData.ranking[0];
          if (firstGuild) {
            const guildId = await GuildApiService.fetchGuildId(
              firstGuild.guild_name,
              firstGuild.world_name
            );
            const guildImg = await GuildApiService.fetchGuildImgUrl(guildId);

            firstGuild.guild_mark = guildImg.guild_mark;
            firstGuild.guild_mark_custom = guildImg.guild_mark_custom;

            const guildMemberCount = await GuildApiService.fetchGuilMemberCount(
              guildId
            );
            firstGuild.guild_member_count = guildMemberCount;
          }
          return firstGuild;
        });
        const worldSuroes = await Promise.all(resultPromises);

        setWorldSuro(worldSuroes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [sundayDate]);

  if (!worldSuro) return <Loading />;
  return (
    <div className="flex flex-col px-4">
      <div className="text-lg font-[600]">월드별 수로 1등 길드</div>
      <div className="text-[12px] ">{`기간 ${mondayDate} ~ ${sundayDate}`}</div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-5">
        {worldSuro &&
          worldSuro.map(
            (guild) =>
              guild !== undefined && (
                <Link
                  to={`/guildDetail/${guild.world_name}/${guild.guild_name}`}
                >
                  <div
                    className=" min-w-[140px] px-3 py-2 rounded-sm border border-dark-150 dark:border-none dark:bg-dark-200"
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
              )
          )}
      </div>
    </div>
  );
};

export default GuilFirstSuroOfWolrd;
