import { AxiosResponse } from "axios";
import { getApiInstance } from "./base";
import { CubeResult } from "types/cube";

const CubeApiService = {
  fetchCubeData: async (
    apiKey: string,
    date: string | null,
    cursor: string | null
  ) => {
    try {
      const apiInstance = getApiInstance(apiKey);
      let endpoint = `/history/potential?count=1000&date=${date}`;
      if (cursor) {
        endpoint = `/history/potential?count=1000&cursor=${cursor}`;
      }
      const res: AxiosResponse<CubeResult> = await apiInstance.get(endpoint);
      return res.data;
    } catch (error) {
      console.error("Error fetching cube:", error);
      throw error;
    }
  },
};

export default CubeApiService;
