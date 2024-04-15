import GuildDetail from "components/GuildDetail/GuildDetail";
import Header from "components/Header/Header";
import { useParams } from "react-router-dom";

const GuildDetailPage = () => {
  const { worldName, guildName } = useParams<{
    worldName: string;
    guildName: string;
  }>();

  return (
    <div>
      <Header defaultTab="길드" />
      <div className="grow max-w-[1120px] mx-auto">
        <GuildDetail worldName={worldName} guildName={guildName} />
      </div>
    </div>
  );
};

export default GuildDetailPage;
