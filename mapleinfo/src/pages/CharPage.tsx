import Char from "../components/Char/Char";
import { useParams } from "react-router-dom";

const CharPage = () => {
  const { value } = useParams<{ value: string | undefined }>();

  return (
    <div className="bg-dark-50">
      <Char value={value} />
    </div>
  );
};

export default CharPage;
