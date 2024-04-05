import { useState } from "react";
import { StarForceHistory } from "types/starforce";
import formatDate from "utils/formatDate";

interface StarForceResultListProps {
  starForceHistory: StarForceHistory[];
}

const StarForceResultList = ({
  starForceHistory,
}: StarForceResultListProps) => {
  const [visibleCount, setVisibleCount] = useState(100);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 100);
  };

  return (
    <div className="flex flex-col gap-y-2 text-[11px] md:text-[12px] mt-2">
      {starForceHistory.slice(0, visibleCount).map(
        (history) =>
          history.before_starforce_count > 12 && (
            <div
              key={history.id}
              className={`flex items-center p-2 ${
                history.item_upgrade_result === "성공"
                  ? "bg-starforce-success"
                  : history.item_upgrade_result === "파괴"
                  ? "bg-starforce-destroyed"
                  : "bg-starforce-failed"
              } bg-dark-200`}
            >
              <div className="flex-1">
                <div>{history.item_upgrade_result}</div>
                <div className="text-[14px] md:text-[16px] font-[500]">{`${history.before_starforce_count} → ${history.after_starforce_count}`}</div>
                <div className="flex">
                  {history.starcatch_result === "성공" && <div>스타캐치</div>}
                  {history.destroy_defence === "파괴 방지 적용" && (
                    <div>파괴방지</div>
                  )}
                </div>
              </div>
              <div className="flex-1 text-center">
                <div className="text-[14px] md:text-[16px] font-[600]">
                  {history.target_item}
                </div>
                <div>
                  <span>{history.world_name}</span>
                  <span>{` / ${history.character_name}`}</span>
                </div>
              </div>
              <div className="flex-1 text-right">
                <div>{formatDate(new Date(history.date_create))}</div>
              </div>
            </div>
          )
      )}
      {visibleCount < starForceHistory.length && (
        <button
          onClick={handleLoadMore}
          className="cursor-pointer hover:bg-dark-150"
        >
          더보기
        </button>
      )}
    </div>
  );
};

export default StarForceResultList;
