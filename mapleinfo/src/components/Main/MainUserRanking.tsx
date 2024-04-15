import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RankApiService from "services/RankApiService";
import { UserRanking } from "types/rank";

const MainUserRanking = () => {
  const [userRanking, setUserRanking] = useState<UserRanking[]>();
  useEffect(() => {
    const fetchData = async () => {
      const res = await RankApiService.fetchTotalRankingData(0);
      const slicedRes = res.ranking.slice(0, 10);
      setUserRanking(slicedRes);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col border border-dark-150 dark:border-none dark:bg-dark-250 gap-y-0.5 p-2 rounded-md ">
      <div className="pl-1 py-1 border-b-[0.5px]">일반 월드 랭킹</div>
      <div className="flex flex-col gap-y-2 text-[12px] pt-1">
        {userRanking &&
          userRanking.map((user) => (
            <Link to={`/char/${user.character_name}`}>
              <div
                key={user.character_name}
                className="grid grid-cols-[1.4em_auto_1fr_auto_auto_auto] items-center gap-x-1 hover:bg-dark-300 dark:hover:bg-dark-200 cursor-pointer"
              >
                <div className="text-center">{user.ranking}</div>
                <div className="flex items-center gap-x-1">
                  <img
                    src={require(`assets/worldLogo/${user.world_name}.png`)}
                    alt={user.world_name}
                    className="w-4 h-4"
                  />
                  <span>{user.character_name}</span>
                </div>
                <div></div>
                <div>
                  <span className="text-dark-150 font-[400]">
                    {!user.sub_class_name
                      ? user.class_name
                      : user.sub_class_name}
                  </span>
                </div>
                <div>
                  <span>{`Lv.${user.character_level}`}</span>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default MainUserRanking;
