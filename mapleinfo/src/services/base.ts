import axios from "axios";

const apiInstance = axios.create({
  baseURL: "https://open.api.nexon.com/maplestory/v1",
  headers: { "x-nxopen-api-key": process.env.REACT_APP_API_KEY },
});
