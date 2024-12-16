const twilio = require('twilio');
const config = require('../config/twilio');

const generateAccessToken = (identity) => {
  const accessToken = new twilio.jwt.AccessToken(
    config.accountSid,
    config.apiKey,
    config.apiSecret,
    { identity }
  );

  const voiceGrant = new twilio.jwt.AccessToken.VoiceGrant({
    outgoingApplicationSid: config.twimlAppSid,
    incomingAllow: true
  });

  accessToken.addGrant(voiceGrant);
  return accessToken.toJwt();
};

module.exports = {
  generateAccessToken
};