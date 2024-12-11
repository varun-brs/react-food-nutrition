import axios from "axios";

const BaseURL = process.env.REACT_APP_API_ENDPOINT;

const oHeaders = {
  headers: {
    "x-app-id": process.env.REACT_APP_API_ID,
    "x-app-key": process.env.REACT_APP_API_KEY,
    "x-remote-user-id": process.env.REACT_APP_API_USER_ID,
  },
};

export const HttpPost = async (aParams) => {
  let oResponse = await axios.post(BaseURL, aParams, oHeaders);
  return oResponse?.data;
};
