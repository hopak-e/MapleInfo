import { AxiosResponse } from "axios";
import { getApiInstance } from "./base";
import { StarForceResult } from "types/starforce";

const StarForceApiServices = {
  fetchStarforceData: async (
    apiKey: string,
    date: string | null,
    cursor: string | null
  ): Promise<StarForceResult> => {
    try {
      const apiInstance = getApiInstance(apiKey);
      let endpoint = `/history/starforce?count=1000&date=${date}`;
      if (cursor) {
        endpoint = `/history/starforce?count=1000&cursor=${cursor}`;
      }
      const res: AxiosResponse<StarForceResult> = await apiInstance.get(
        endpoint
      );
      return res.data;
    } catch (error) {
      console.error("Error fetching starforce:", error);
      throw error;
    }
  },
};

export default StarForceApiServices;
