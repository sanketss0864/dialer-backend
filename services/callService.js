const client = require('./twilioClient');
const config = require('../config/twilio');

const makeOutboundCall = async (to, from = config.callerId, recordingOptions) => {
  return client.calls.create({
    to,
    from,
    ...recordingOptions,
    twiml: '<Response><Say>Outbound call started. Recording will begin now.</Say><Record/></Response>'
  });
};

const getRecordings = async () => {
  const recordings = await client.recordings.list();
  return recordings.map(recording => ({
    sid: recording.sid,
    duration: recording.duration,
    channels: recording.channels,
    status: recording.status,
    startTime: recording.startTime,
    url: recording.mediaUrl,
    callSid: recording.callSid
  }));
};

module.exports = {
  makeOutboundCall,
  getRecordings
};