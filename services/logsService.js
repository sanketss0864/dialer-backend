const client = require('./twilioClient');

const getCallLogs = async (params = {}) => {
  const { limit = 50, startDate, endDate } = params;
  
  let query = { limit };
  if (startDate) query.startDate = new Date(startDate).toISOString();
  if (endDate) query.endDate = new Date(endDate).toISOString();
  
  return client.calls.list(query);
};

const getCallDetails = async (callSid) => {
  return client.calls(callSid).fetch();
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