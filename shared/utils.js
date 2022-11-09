const axios = require("axios").default;
const GETRequest = async (url, params) => {
  axios.create();
  try {
    const response = await axios.get(url, { params: params });
  } catch (error) {
    console.error("Error in get request :", error);
  }
};
const POSTRequest = async (url, params) => {
  axios.create();
  try {
    const response = await axios.post(url, params);
  } catch (error) {
    console.error("Error in get request :", error);
  }
  console.log('RESPONSE ===========', response.data);
  return response.data;
};

module.exports = { GETRequest, POSTRequest };
