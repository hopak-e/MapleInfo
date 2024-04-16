import Header from "components/Header/Header";
import SignIn from "components/SignIn/SignIn";
import StarForce from "components/StarForce/StarForce";
import { useParams } from "react-router-dom";

const StarForcePage = () => {
  const { result } = useParams<string>();
  return (
    <div>
      <Header defaultTab="스타포스" />
      {result ? <StarForce /> : <SignIn type="스타포스" />}
    </div>
  );
};

export default StarForcePage;
