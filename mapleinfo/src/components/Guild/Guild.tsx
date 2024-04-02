import GuildSearch from "./GuildSearch";
import GuildSearchResult from "./GuildSearchResult";
import GuildSuroRanking from "./GuilSuroRanking";

interface GuildProps {
  worldName: string | undefined;
  guildName: string | undefined;
}

const Guild = ({ worldName, guildName }: GuildProps) => {
  return (
    <div className="max-w-[1120px] mx-auto grow">
      <GuildSearch />
      {guildName ? (
        <GuildSearchResult worldName={worldName} guildName={guildName} />
      ) : (
        <GuildSuroRanking />
      )}
    </div>
  );
};

export default Guild;
