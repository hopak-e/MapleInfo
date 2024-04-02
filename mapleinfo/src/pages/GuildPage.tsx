import Guild from "../components/Guild/Guild";
import { useParams } from "react-router-dom";

const GuildPage = () => {
  const { worldName, guildName } =
    useParams<Record<string, string | undefined>>();
  return <Guild worldName={worldName} guildName={guildName} />;
};

export default GuildPage;
