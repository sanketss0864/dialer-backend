const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  accountSid: process.env.TWILIO_ACCOUNT_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
  apiKey: process.env.TWILIO_API_KEY,
  apiSecret: process.env.TWILIO_API_SECRET,
  twimlAppSid: process.env.TWILIO_TWIML_APP_SID,
  callerId: process.env.CALLER_ID
};