import Header from "components/Header/Header";
import Char from "../components/Char/Char";
import { useParams } from "react-router-dom";

const CharPage = () => {
  const { nickName } = useParams<{ nickName: string | undefined }>();

  return (
    <div>
      <Header defaultTab="" />
      <Char nickName={nickName} />
    </div>
  );
};

export default CharPage;
