import { AxiosResponse } from "axios";
import { apiInstance } from "./base";
import { CubeResult } from "types/cube";

const CubeApiService = {
  fetchCubeData: async (date: string | null, cursor: string | null) => {
    try {
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
