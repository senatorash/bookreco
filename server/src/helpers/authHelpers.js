const { OAuth2Client } = require("google-auth-library");
const envVariable = require("../config/index");
const { CLIENT_ID, CLIENT_SECRET } = envVariable;
const client = new OAuth2Client(CLIENT_ID);

const verifyGoogleToken = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID,
  });
  const payload = ticket.getPayload();
  return payload;
};

module.exports = verifyGoogleToken;
