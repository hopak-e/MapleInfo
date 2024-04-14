import { StarForceHistory, Statement } from "types/starforce";

interface StarForceStatementProps {
  starForceHistory: StarForceHistory[] | undefined;
  starForceStatement: Statement;
}

const StarForceStatement = ({
  starForceHistory,
  starForceStatement,
}: StarForceStatementProps) => {
  let destroyedSum: number = 0;
  starForceStatement &&
    Object.entries(starForceStatement).forEach(
      ([key, value]) => (destroyedSum += value.destroyed)
    );

  return (
    <div className="grow-0 shrink-0 basis-[250px] ">
      <div className="flex w-full text-center mb-2 bg-dark-50 rounded-sm py-1">
        <div className="flex-1">
          <div>강화 횟수</div>
          <div>{starForceHistory?.length}</div>
        </div>
        <div className="flex-1">
          <div>파괴 횟수</div>
          <div>{destroyedSum}</div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <table className="flex flex-col justify-center text-center w-[250px] bg-dark-50 rounded-sm py-1">
          <thead>
            <tr className="flex">
              <th className="flex-1">구간</th>
              <th className="flex-1">횟수</th>
              <th className="flex-1">성공 확률</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(starForceStatement).map(
              ([key, value]) =>
                Number(key) >= 12 && (
                  <tr className="flex" key={key}>
                    <td className="flex-1">{`${key}~${Number(key) + 1}`}</td>
                    <td className="flex-1">
                      {value.count !== 0 ? value.count : "-"}
                    </td>
                    <td className="flex-1">
                      {value.count !== 0
                        ? `${
                            Math.round(
                              (value.success / value.count) * 100 * 10
                            ) / 10
                          }%`
                        : "-"}
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </table>
        <div className="text-[10px] bg-dark-50 rounded-sm p-1 mt-1">
          {`12성 미만 구간 및 확률이 100%인 구간의 경우 위 확률표에서 제외됩니다. (찬스타임, 5,10,15 100%확률)`}
        </div>
      </div>
    </div>
  );
};

export default StarForceStatement;
