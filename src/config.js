var api_url = "";

switch (process.env.NODE_ENV) {
  case "development":
    api_url = "http://localhost:8000/api";
    break;
  case "production":
    api_url = "https://foodrepublic.ng/api";
    break;
}

export const AXIOS_CONFIG = {
  API_URL: api_url
};
