import Rare from "assets/grade/rare.png";
import Epic from "assets/grade/epic.png";
import Unique from "assets/grade/unique.png";
import Legendary from "assets/grade/legendary.png";

const getPotentialImg = (potential: string) => {
  switch (potential) {
    case "레전드리":
      return (
        <img src={Legendary} alt="레전드리" className="w-[12px] h-[12px]" />
      );
    case "유니크":
      return <img src={Unique} alt="유니크" className="w-[12px] h-[12px]" />;
    case "에픽":
      return <img src={Epic} alt="에픽" className="w-[12px] h-[12px]" />;
    case "레어":
      return <img src={Rare} alt="레어" className="w-[12px] h-[12px]" />;
    default:
      return null;
  }
};

export default getPotentialImg;
