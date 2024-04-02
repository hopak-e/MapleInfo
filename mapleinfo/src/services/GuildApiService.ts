import axios, { AxiosResponse } from "axios";
import { apiInstance } from "./base";
import { Guild, GuildRanking } from "types/guild";
const GuildApiService = {
  fetchRankingData: async (
    date: string,
    worldName: string,
    rankingType: number,
    guildName?: string
  ): Promise<GuildRanking> => {
    try {
      let endpoint = `/ranking/guild?date=${date}&world_name=${worldName}&ranking_type=${rankingType}`;
      if (guildName) {
        endpoint += `&guild_name=${guildName}`;
      }
      const res = await apiInstance.get(endpoint);
      return res.data;
    } catch (error) {
      console.error("Error fetching guild ranking data.", error);
      throw error;
    }
  },
  fetchGuildSearchData: async (
    worldName: string,
    guildName: string
  ): Promise<GuildRanking> => {
    try {
      let endpoint = `/ranking/guild?date=2023-12-22&ranking_type=0&guild_name=${guildName}`;
      if (worldName !== "전체월드") {
        endpoint += `&world_name=${worldName}`;
      }
      const res: AxiosResponse<GuildRanking> = await apiInstance.get(endpoint);
      return res.data;
    } catch (error) {
      console.error("Error fetching guild search data:", error);
      throw error;
    }
  },
  fetchGuildId: async (
    guildName: string,
    worldName: string
  ): Promise<string> => {
    try {
      const res: AxiosResponse<{ oguild_id: string }> = await apiInstance.get(
        `/guild/id?guild_name=${guildName}&world_name=${worldName}`
      );
      return res.data.oguild_id;
    } catch (error) {
      console.error("Error fetching guild Id:", error);
      throw error;
    }
  },

  fetchGuildBasicData: async (oguild_id: string): Promise<Guild> => {
    try {
      const res: AxiosResponse<Guild> = await apiInstance.get(
        `/guild/basic?oguild_id=${oguild_id}`
      );
      return res.data;
    } catch (error) {
      console.error("Error fetching guild basic data:", error);
      throw error;
    }
  },

  fetchGuilMemberCount: async (oguild_id: string): Promise<number> => {
    try {
      const res: AxiosResponse<{ guild_member_count: number }> =
        await apiInstance.get(`/guild/basic?oguild_id=${oguild_id}`);
      return res.data.guild_member_count;
    } catch (error) {
      console.error("Error fetching guild basic data:", error);
      throw error;
    }
  },

  fetchGuildImgUrl: async (
    oguild_id: string
  ): Promise<{
    guild_mark: string | undefined;
    guild_mark_custom: string | undefined;
  }> => {
    try {
      const res: AxiosResponse<{
        guild_mark: string | undefined;
        guild_mark_custom: string | undefined;
      }> = await apiInstance.get(`/guild/basic?oguild_id=${oguild_id}`);

      return {
        guild_mark: res.data.guild_mark,
        guild_mark_custom: res.data.guild_mark_custom,
      };
    } catch (error) {
      console.error("Error fetching guildImgUrl data:", error);
      throw error;
    }
  },
};

export default GuildApiService;
