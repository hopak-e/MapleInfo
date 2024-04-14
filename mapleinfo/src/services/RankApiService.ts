import { AxiosResponse } from "axios";
import { apiInstance } from "./base";
import { TotalRanking } from "types/rank";

const getCurrentDate = () => {
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();

  if (currentHour < 8 || (currentHour === 8 && currentMinutes < 31)) {
    const yesterday = new Date(currentDate);
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().split("T")[0];
  } else {
    return currentDate.toISOString().split("T")[0];
  }
};
const currentDate = getCurrentDate();

const RankApiService = {
  fetchTotalRankingData: async (worldType: number): Promise<TotalRanking> => {
    try {
      const res: AxiosResponse<TotalRanking> = await apiInstance.get(
        `ranking/overall?date=${currentDate}&world_type=${worldType}`
      );
      return res.data;
    } catch (error) {
      console.error("fetching ranking date error:", error);
      throw error;
    }
  },
};

export default RankApiService;
