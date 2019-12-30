var api_url = "";

switch (process.env.NODE_ENV) {
  case "development":
    api_url = "https://foodrepublic.herokuapp.com/api";
    break;
  case "production":
    api_url = "https://foodrepublic.herokuapp.com/api";
    break;
}

export const AXIOS_CONFIG = {
  API_URL: api_url
};
