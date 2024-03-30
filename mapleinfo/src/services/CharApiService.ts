import axios, { AxiosResponse } from "axios";
import {
  CharBasicData,
  CharStatData,
  HyperStat,
  Ability,
  Equipment,
  Android,
} from "../types/char";

const apiInstance = axios.create({
  baseURL: "https://open.api.nexon.com/maplestory/v1",
  headers: { "x-nxopen-api-key": process.env.REACT_APP_API_KEY },
});

const today = new Date();
const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1)
  .toString()
  .padStart(2, "0")}-${
  Number(today.getDate().toString().padStart(2, "0")) - 2
}`;

const CharApiService = {
  fetchOcidData: async (charName: string | undefined): Promise<string> => {
    try {
      const res: AxiosResponse<{ ocid: string }> = await apiInstance.get(
        `/id?character_name=${charName}`
      );
      return res.data.ocid;
    } catch (error) {
      console.error("Error fetching ocid:", error);
      throw error;
    }
  },

  fetchBasicCharacterData: async (ocid: string): Promise<CharBasicData> => {
    try {
      const [basicRes, popularityRes, unionRes, statRes] = await Promise.all([
        apiInstance.get<CharBasicData>(
          `/character/basic?ocid=${ocid}&date=${formattedDate}`
        ),
        apiInstance.get<{ popularity: number }>(
          `/character/popularity?ocid=${ocid}`
        ),
        apiInstance.get<{ union_level: string }>(`/user/union?ocid=${ocid}`),
        apiInstance.get<{ final_stat: CharStatData[] }>(
          `/character/stat?ocid=${ocid}`
        ),
      ]);

      const worldType =
        basicRes.data.world_name === "리부트" ||
        basicRes.data.world_name === "리부트2"
          ? 1
          : 0;
      const totalRankingRes = await apiInstance.get<{
        ranking: CharBasicData[];
      }>(
        `/ranking/overall?date=${formattedDate}&world_type=${worldType}&ocid=${ocid}`
      );

      const worldRankingRes = await apiInstance.get<{
        ranking: CharBasicData[];
      }>(
        `/ranking/overall?date=${formattedDate}&world_name=${basicRes.data.world_name}&ocid=${ocid}`
      );

      return {
        ...basicRes.data,
        character_popularity: popularityRes.data.popularity,
        union_level: unionRes.data.union_level,
        final_stat: statRes.data.final_stat,
        total_ranking: totalRankingRes.data.ranking[0].ranking,
        world_ranking: worldRankingRes.data.ranking[0].ranking,
      };
    } catch (error) {
      console.error("Error fetching basic character data:", error);
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

  fetchGuildImgUrl: async (oguilId: string): Promise<string | undefined> => {
    try {
      const res: AxiosResponse<{ guild_mark_custom: string }> =
        await apiInstance.get(`/guild/basic?oguild_id=${oguilId}`);
      return res.data.guild_mark_custom;
    } catch (error) {
      console.error("Error fetching guildImgUrl data:", error);
      throw error;
    }
  },

  fetchHyperStat: async (ocid: string): Promise<HyperStat> => {
    try {
      const res = await apiInstance.get(`/character/hyper-stat?ocid=${ocid}`);
      return res.data;
    } catch (error) {
      console.error("Error fetching hyperStat data:", error);
      throw error;
    }
  },

  fetchAbility: async (ocid: string): Promise<Ability> => {
    try {
      const res = await apiInstance.get(`/character/ability?ocid=${ocid}`);
      return res.data;
    } catch (error) {
      console.error("Error fetching ability data:", error);
      throw error;
    }
  },

  fetchEquipment: async (ocid: string): Promise<Equipment> => {
    try {
      const res = await apiInstance.get(
        `/character/item-equipment?ocid=${ocid}`
      );
      return res.data;
    } catch (error) {
      console.error("Error fetching equipment data:", error);
      throw error;
    }
  },

  fetchAndroid: async (ocid: string): Promise<Android> => {
    try {
      const res = await apiInstance.get(
        `/character/android-equipment?ocid=${ocid}`
      );
      return res.data;
    } catch (error) {
      console.error("Error fetching android data:", error);
      throw error;
    }
  },
};

export default CharApiService;
