const axios = require("axios");
const envVarables = require("../../config/index");

const { RAPID_API_KEY, RRAPID_API_HOST, FILTER_URL } = envVarables;

const encodedParams = new URLSearchParams();

const profanityFilter = async (word) => {
  encodedParams.set("content", `${word}`);
  encodedParams.set("censor-character", "*");

  const options = {
    method: "POST",
    url: FILTER_URL,
    headers: {
      "content-type": "application/x-www-form-urlencodeds",
      "x-RapidAPI-Key": RAPID_API_KEY,
      "x-RapidAPI-Host": RRAPID_API_HOST,
    },
    data: encodedParams,
  };

  const response = await axios.request(options);

  const data = await response.data;
  const isBad = Object.values(data)[1];

  return isBad;
};

module.exports = profanityFilter;
