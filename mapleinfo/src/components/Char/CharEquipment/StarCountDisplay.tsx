import Star from "../../../assets/star.svg";
import GrayStar from "../../../assets/graystar.svg";
import BlueStar from "../../../assets/bluestar.svg";

interface Props {
  starforce: string | undefined;
  equipLevel: number;
  scrollFlag: string;
}

const StarCountDisplay = ({ starforce, equipLevel, scrollFlag }: Props) => {
  const totalStars =
    equipLevel &&
    (equipLevel >= 138
      ? 25
      : equipLevel >= 128
      ? 20
      : equipLevel >= 118
      ? 15
      : equipLevel >= 108
      ? 10
      : equipLevel >= 95
      ? 8
      : 5);
  const starforceNumber = Number(starforce);

  const stars = [];

  for (let i = 0; i < totalStars; i++) {
    if (i < starforceNumber) {
      stars.push(
        <img
          key={i}
          src={scrollFlag === "사용" ? BlueStar : Star}
          alt="Star"
          className={`inline-block w-[11px] h-[11px] ${
            i !== totalStars - 1 && "pr-[1px]"
          }`}
        />
      );
    } else {
      stars.push(
        <img
          key={i}
          src={GrayStar}
          alt="GrayStar"
          className={`inline-block w-[11px] h-[11px] ${
            i !== totalStars - 1 && "pr-[1px]"
          }`}
        />
      );
    }
    if ((i + 1) % 5 === 0 && i !== totalStars - 1) {
      stars.push(<div key={`spacer-${i}`} className="inline-block pr-[6px]" />);
    }
    if (i === 14) {
      stars.push(<div key="linebreak" />);
    }
  }

  return <div className="text-center">{stars}</div>;
};

export default StarCountDisplay;
