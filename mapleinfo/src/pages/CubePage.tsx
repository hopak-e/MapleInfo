import Cube from "components/Cube/Cube";
import SignIn from "components/SignIn/SignIn";
import Header from "components/Header/Header";
import { useParams } from "react-router-dom";

const CubePage = () => {
  const { result } = useParams<string>();
  return (
    <div>
      <Header defaultTab="큐브" />
      {result ? <Cube /> : <SignIn type="큐브" />}
    </div>
  );
};

export default CubePage;
