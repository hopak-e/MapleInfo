import Header from "components/Header/Header";
import TrackChar from "components/TrackChar/TrackChar";
import TrackedChar from "components/TrackChar/TrackedChar";
import { useParams } from "react-router-dom";

const TrackCharPage = () => {
  const { nickName } = useParams<string>();
  return (
    <div>
      <Header defaultTab="본캐 찾기" />
      <div className="max-w-[1120px] mx-auto">
        <TrackChar />
        {nickName && <TrackedChar nickName={nickName} />}
      </div>
    </div>
  );
};

export default TrackCharPage;
