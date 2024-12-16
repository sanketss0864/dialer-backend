const twilio = require('twilio');
const config = require('../config/twilio');

const client = twilio(config.accountSid, config.authToken);

module.exports = client;