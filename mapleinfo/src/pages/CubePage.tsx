import Cube from "components/Cube/Cube";
import Header from "components/Header/Header";

const CubePage = () => {
  return (
    <div>
      <Header defaultTab="큐브" />
      <Cube />
    </div>
  );
};

export default CubePage;
