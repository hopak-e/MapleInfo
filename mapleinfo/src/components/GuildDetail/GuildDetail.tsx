import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Guild, GuildSkill } from "types/guild";
import GuildApiService from "services/GuildApiService";
import GuildInput from "../Guild/GuildInput";
import CharApiService from "services/CharApiService";
import Crown from "assets/crown.svg";

import Loading from "components/Loading/Loading";
import getLastDate from "utils/dateUtils/getLastDate";

interface GuildDetailProps {
  worldName?: string;
  guildName?: string;
}

interface MemberInfo {
  name: string;
  level: number;
  class: string;
  imgUrl: string;
}

const GuildDetail = ({ worldName, guildName }: GuildDetailProps) => {
  const [guildData, setGuildData] = useState<Guild>();
  const [hoveredNovel, setHoveredNovel] = useState<GuildSkill | null>(null);
  const [memberInfo, setMemberInfo] = useState<(MemberInfo | null)[]>([]);

  const formattedDate = getLastDate(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (worldName && guildName) {
          const oguildId: string = await GuildApiService.fetchGuildId(
            guildName,
            worldName
          );
          const guildBasicData: Guild =
            await GuildApiService.fetchGuildBasicData(oguildId);

          const [fameRanking, flagRanking, suroRanking] = await Promise.all([
            GuildApiService.fetchRankingData(
              formattedDate,
              0,
              worldName,
              guildName
            ),
            GuildApiService.fetchRankingData(
              formattedDate,
              1,
              worldName,
              guildName
            ),
            GuildApiService.fetchRankingData(
              formattedDate,
              2,
              worldName,
              guildName
            ),
          ]);
          console.log(guildBasicData);
          console.log(fameRanking);
          guildBasicData.fame_ranking = fameRanking.ranking[0]
            ? fameRanking.ranking[0].ranking
            : 0;
          guildBasicData.flag_ranking = flagRanking.ranking[0]
            ? flagRanking.ranking[0].ranking
            : 0;
          guildBasicData.suro_ranking = suroRanking.ranking[0]
            ? suroRanking.ranking[0].ranking
            : 0;

          const memberArr = guildBasicData.guild_member;
          const masterIndex = memberArr?.indexOf(
            guildBasicData.guild_master_name
          );
          if (masterIndex && memberArr) {
            const removedMember = memberArr.splice(masterIndex, 1);
            memberArr?.unshift(removedMember[0]);
          }

          if (guildBasicData.guild_member) {
            const batchSize = 20;
            const result: (MemberInfo | null)[] = [];

            for (
              let i = 0;
              i < guildBasicData.guild_member.length;
              i += batchSize
            ) {
              const batch = guildBasicData.guild_member.slice(i, i + batchSize);
              const batchResults = await Promise.all(
                batch.map(async (member) => {
                  try {
                    const ocid = await CharApiService.fetchOcidData(member);
                    const memberInfo = await CharApiService.fetchBasicData(
                      ocid
                    );

                    return {
                      name: memberInfo.character_name,
                      level: memberInfo.character_level,
                      class: memberInfo.character_class,
                      imgUrl: memberInfo.character_image,
                    };
                  } catch (error) {
                    console.error(
                      `Error fetching data for member ${member}`,
                      error
                    );
                    return null;
                  }
                })
              );
              const filteredResults = batchResults.filter(
                (result) => result !== null
              );
              result.push(...filteredResults);
            }
            setMemberInfo(result);
          }

          setGuildData(guildBasicData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [worldName, guildName, formattedDate]);

  // if (!guildData) return ;
  return (
    <div className="flex flex-col items-center py-2 gap-y-1 dark:text-white">
      <GuildInput worldName={worldName} guildName={guildName} />
      {guildData ? (
        <div className="flex flex-col">
          <div className="flex items-center gap-x-1 mt-2">
            <img
              src={require(`assets/worldLogo/${guildData.world_name}.png`)}
              alt={guildData.world_name}
              className="w-4 h-4"
            />
            <span className="text-[12px]">{guildData.world_name}</span>
          </div>
          <div className="flex justify-between text-[30px] mb-2">
            <div className="flex items-center gap-x-2">
              <img
                src={
                  guildData.guild_mark
                    ? guildData.guild_mark
                    : `data:image/png;base64,${guildData.guild_mark_custom}`
                }
                alt={guildData.guild_name}
                className="w-10 h-10"
              />
              <span className="font-[700]">{guildData.guild_name}</span>
            </div>
            <div className="relative flex text-center text-[12px] gap-x-0.5">
              {guildData.guild_noblesse_skill &&
                guildData.guild_noblesse_skill.map((item) => (
                  <div
                    key={item.skill_name}
                    className="px-1 pt-1 border border-dark-150 dark:bg-dark-100 dark:border-[0.2px] dark:boder-white rounded-sm cursor-pointer"
                    onMouseEnter={() => setHoveredNovel(item)}
                    onMouseLeave={() => setHoveredNovel(null)}
                  >
                    <div className="">
                      <img src={item.skill_icon} alt={item.skill_name} />
                    </div>
                    <div>{item.skill_level}</div>
                    {hoveredNovel === item && (
                      <div
                        className="absolute top-[102%] left-0 z-10 -translate-x-[50%] p-1 rounded-md w-[380px] border border-dark-100 dark:border-white bg-dark-100 text-white"
                        onMouseEnter={() => setHoveredNovel(null)}
                      >
                        <div className="flex flex-col text-[11px] leading-[1.35em]">
                          <div className="text-[16px] text-center font-[700] py-2">
                            {item.skill_name}
                          </div>
                          <div className="relative flex justify-between gap-x-2 font-[400] pb-3 border-b border-dark-150 border-dashed">
                            <div className="relative w-[72px] h-[72px] grow-0 shrink-0">
                              <img
                                src={item.skill_icon}
                                alt={item.skill_name}
                                className="absolute top-0 left-[6px] w-[60px] h-[60px]"
                              />
                            </div>
                            <div className="grow shrink text-left whitespace-pre-wrap">
                              {item.skill_description}
                            </div>
                          </div>
                          <div className="py-2 px-2">
                            <div>{`[현재레벨 ${item.skill_level}]`}</div>
                            <div className="whitespace-pre-wrap">
                              {item.skill_effect}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
          <div className="grid grid-cols-2 grid-rows-3 min-w-[400px] md:grid-cols-5 md:grid-rows-1 grow shrink border border-dark-150 dark:border-none dark:bg-dark-100 px-4 py-4 text-center rounded-md">
            <div className="col-span-2 md:col-span-1 min-w-[200px] ">
              <div>길드 마스터</div>
              <div>{guildData.guild_master_name}</div>
            </div>
            <div>
              <div>길드원 수</div>
              <div>{guildData.guild_member_count}명</div>
            </div>
            <div>
              <div>주간 명성치 순위</div>
              <div>{guildData.fame_ranking}위</div>
            </div>
            <div>
              <div>플래그 순위</div>
              <div>{guildData.flag_ranking}위</div>
            </div>
            <div>
              <div>지하수로 순위</div>
              <div>{guildData.suro_ranking}위</div>
            </div>
          </div>
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mt-4">
            {memberInfo &&
              memberInfo.map(
                (member) =>
                  member && (
                    <Link to={`/char/${member.name}`}>
                      <div className="relative text-[14px] p-1 sm:px-3 sm:py-2 border border-dark-150 dark:border-none dark:bg-dark-100 rounded-md">
                        <div className="flex items-center gap-x-2">
                          <img
                            src={member.imgUrl}
                            alt={member.name}
                            className="w-[60px] h-[60px] sm:w-[82px] sm:h-[82px] shrink-0 grow-0"
                          />
                          <div className="grow shrink">
                            <div className="sm:text-xl font-[600]">
                              {member.name}
                            </div>
                            <div className="text-[11px]">{`Lv.${member.level}`}</div>
                            <div className="text-[11px]">{member.class}</div>
                          </div>
                        </div>
                        {guildData.guild_master_name === member.name && (
                          <img
                            src={Crown}
                            alt="crown"
                            className="absolute top-1 right-1 w-6 h-6"
                          />
                        )}
                      </div>
                    </Link>
                  )
              )}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default GuildDetail;
