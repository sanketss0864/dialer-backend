const client = require('./twilioClient');

const getCallLogs = async (params = {}) => {
  const { limit = 50, startDate, endDate } = params;
  
  let query = { limit };
  if (startDate) query.startDate = new Date(startDate).toISOString();
  if (endDate) query.endDate = new Date(endDate).toISOString();
  
  return client.calls.list(query);
};

const getCallDetails = async (callSid) => {
  const call = await client.calls(callSid).fetch();
  const recordings = await client.recordings.list({ callSid });
  
  return {
    ...call,
    recordings: recordings.map(recording => ({
      sid: recording.sid,
      duration: recording.duration,
      url: recording.url
    }))
  };
};

const getTranscriptions = async (params = {}) => {
  const { limit = 50 } = params;
  return client.transcriptions.list({ limit });
};

const getTranscriptionDetails = async (transcriptionSid) => {
  return client.transcriptions(transcriptionSid).fetch();
};

module.exports = {
  getCallLogs,
  getCallDetails,
  getTranscriptions,
  getTranscriptionDetails
};