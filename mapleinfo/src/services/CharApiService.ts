import axios, { AxiosResponse } from "axios";
import {
  CharBasicData,
  CharStatData,
  HyperStat,
  Ability,
  Equipment,
  Android,
  Matrix,
  UnionRanking,
} from "types/char";
import { apiInstance } from "./base";

const today = new Date();
today.setDate(today.getDate() - 3);
const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1)
  .toString()
  .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;

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

  fetchBasicData: async (ocid: string): Promise<CharBasicData> => {
    try {
      const res = await apiInstance.get<CharBasicData>(
        `/character/basic?ocid=${ocid}&date=${formattedDate}`
      );
      return res.data;
    } catch (error) {
      console.error("Error fetching basic character data:", error);
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

  fetchUnionData: async (ocid: string): Promise<UnionRanking> => {
    try {
      const res: AxiosResponse<UnionRanking> = await apiInstance.get(
        `/ranking/union?date=2023-12-22&ocid=${ocid}`
      );
      return res.data;
    } catch (error) {
      console.error("Error fetching union data:", error);
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
  fetchHexa: async (ocid: string, skillGrade: number): Promise<Matrix> => {
    try {
      const res = await apiInstance.get(
        `/character/skill?ocid=${ocid}&character_skill_grade=${skillGrade}`
      );
      return res.data;
    } catch (error) {
      console.error("Error fetching android data:", error);
      throw error;
    }
  },
};

export default CharApiService;
