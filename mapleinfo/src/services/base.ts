import axios from "axios";

export const getApiInstance = (apiKey: string) => {
  return axios.create({
    baseURL: "https://open.api.nexon.com/maplestory/v1",
    headers: { "x-nxopen-api-key": apiKey },
  });
};
const apiKey: string = process.env.REACT_APP_API_KEY || "";
export const apiInstance = getApiInstance(apiKey);
