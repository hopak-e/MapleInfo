import { CubeHistory, CubeStatements } from "types/cube";

interface CubeStatementProps {
  cubeHistory: CubeHistory[];
  cubeStatements: CubeStatements;
  totalPrice: string | undefined;
}

const CubeStatement = ({
  cubeHistory,
  cubeStatements,
  totalPrice,
}: CubeStatementProps) => {
  return (
    <div className="grow-0 shrink-0 basis-[250px]">
      <div className="flex flex-col gap-y-2">
        <div className="flex flex-col text-center bg-dark-50 rounded-sm py-1">
          <div>재설정 횟수</div>
          <div>{cubeHistory.length}</div>
        </div>
        <div className="flex flex-col text-center bg-dark-50 rounded-sm py-1">
          <div>누적 사용 메소</div>
          <div>{totalPrice}</div>
        </div>
        <div className="flex flex-col py-1 bg-dark-50 rounded-sm">
          <div className="pl-2 py-1 text-[14px]  font-[700]">잠재설정</div>
          <table className="flex flex-col text-[12px] text-center">
            <thead className="bg-dark-200">
              <tr className="flex pl-2 py-1">
                <td className="flex-1 text-start">등급</td>
                <td className="flex-1">재설정 횟수</td>
                <td className="flex-1">등급업 횟수</td>
              </tr>
            </thead>
            <tbody>
              {Object.entries(cubeStatements).map(([key, value]) => (
                <tr key={key} className="flex pl-2 pt-1">
                  <td className="flex-1 text-start ">{key}</td>
                  <td className="flex-1">{`${
                    value.potentialOption.count === 0
                      ? "-"
                      : value.potentialOption.count
                  }`}</td>
                  <td className="flex-1">{`${
                    value.potentialOption.success === 0
                      ? "-"
                      : value.potentialOption.success
                  }`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col py-1 bg-dark-50 rounded-sm">
          <div className="pl-2 py-1 text-[14px] font-[700]">
            에디셔널 잠재설정
          </div>
          <table className="flex flex-col text-[12px] text-center">
            <thead className="bg-dark-200">
              <tr className="flex pl-2 py-1">
                <td className="flex-1 text-start ">등급</td>
                <td className="flex-1">재설정 횟수</td>
                <td className="flex-1">등급업 횟수</td>
              </tr>
            </thead>
            <tbody>
              {Object.entries(cubeStatements).map(([key, value]) => (
                <tr key={key} className="flex pl-2 pt-1">
                  <td className="flex-1 text-start">{key}</td>
                  <td className="flex-1">{`${
                    value.additionalOption.count === 0
                      ? "-"
                      : value.additionalOption.count
                  }`}</td>
                  <td className="flex-1">{`${
                    value.additionalOption.success === 0
                      ? "-"
                      : value.additionalOption.success
                  }`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CubeStatement;
