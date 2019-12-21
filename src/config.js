var api_url = "";

switch (process.env.NODE_ENV) {
  case "development":
    api_url = "http://192.168.0.100:8000/api";
    break;
  case "production":
    api_url = "https://foodrepublic.ng/api";
    break;
}

export const AXIOS_CONFIG = {
  API_URL: api_url
};
