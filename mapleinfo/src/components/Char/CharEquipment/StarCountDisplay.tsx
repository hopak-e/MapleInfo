import Star from "../../../assets/star.svg";
import GrayStar from "../../../assets/graystar.svg";

interface Props {
  starforce: string | undefined;
}

const StarCountDisplay = ({ starforce }: Props) => {
  const totalStars = 25;
  const starforceNumber = Number(starforce);

  const stars = [];

  for (let i = 0; i < totalStars; i++) {
    if (i < starforceNumber) {
      stars.push(
        <img
          key={i}
          src={Star}
          alt="Star"
          className={`inline-block w-3 h-3 ${
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
          className={`inline-block w-3 h-3 ${
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
