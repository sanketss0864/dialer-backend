const client = require('./twilioClient');
const config = require('../config/twilio');

const makeOutboundCall = async (to, from = config.callerId, baseUrl) => {
  return client.calls.create({
    url: `${baseUrl}/voice/incoming`,
    to,
    from
  });
};

const getRecordings = async () => {
  return client.recordings.list();
};

module.exports = {
  makeOutboundCall,
  getRecordings
};