import GuildSearch from "components/Guild/GuildSearch";
import { useParams } from "react-router-dom";
import GuildSearchResult from "components/Guild/GuildSearchResult";
import GuilFirstSuroOfWolrd from "components/Guild/GuilFirstSuroOfWolrd";
import Header from "components/Header/Header";

const GuildPage = () => {
  const { worldName, guildName } =
    useParams<Record<string, string | undefined>>();

  return (
    <div>
      <Header defaultTab="길드" />
      <div className="max-w-[1120px] mx-auto grow shrink">
        <GuildSearch />
        {guildName ? (
          <GuildSearchResult worldName={worldName} guildName={guildName} />
        ) : (
          <GuilFirstSuroOfWolrd />
        )}
      </div>
    </div>
  );
};

export default GuildPage;
