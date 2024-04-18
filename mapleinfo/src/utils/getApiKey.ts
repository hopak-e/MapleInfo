const getApiKey = () => {
  const apiKey = localStorage.getItem("api-key");
  const parsedApiKey = apiKey && JSON.parse(apiKey);
  return parsedApiKey;
};

export default getApiKey;
