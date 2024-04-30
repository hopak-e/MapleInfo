import { useState, useEffect } from "react";
import CharApiService from "services/CharApiService";
import { Matrix, Skill } from "types/char";

interface CharHexaMatrixProps {
  ocid: string;
}

const CharHexaMatrix = ({ ocid }: CharHexaMatrixProps) => {
  const [hexaMatrix, setHexaMatrix] = useState<Skill[]>();
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hexa: Matrix = await CharApiService.fetchHexa(ocid, 6);
        setHexaMatrix(hexa.character_skill);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [ocid]);

  return (
    <div className="border border-dark-150 dark:border-none dark:bg-dark-200 shadow-md rounded-sm">
      <div className="p-2">
        <div className="font-[700]">6차</div>
        {hexaMatrix && (
          <div className="flex gap-x-2 pt-2">
            {hexaMatrix.map((item) => (
              <div
                className="relative cursor-pointer border border-dark-150 dark:border-none dark:bg-dark-100 shadow-sm rounded-md"
                key={item.skill_name}
                onMouseEnter={() => setHoveredSkill(item)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                <div className="flex items-center justify-center w-[46px] h-[46px]">
                  <img src={item.skill_icon} alt={item.skill_name} />
                </div>
                <div className="text-center font-[700]">{item.skill_level}</div>
                {hoveredSkill === item && (
                  <div className="absolute top-0 left-[50%] z-10 -translate-x-[50%] -translate-y-[105%] p-1 rounded-md w-[380px] border border-dark-100 dark:border-white bg-dark-100 text-white">
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
        )}
      </div>
    </div>
  );
};

export default CharHexaMatrix;
