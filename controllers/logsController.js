const logsService = require('../services/logsService');

const getCallLogs = async (req, res, next) => {
  try {
    const { limit, startDate, endDate } = req.query;
    const calls = await logsService.getCallLogs({ limit, startDate, endDate });
    res.json(calls);
  } catch (error) {
    next(error);
  }
};

const getCallDetails = async (req, res, next) => {
  try {
    const { callSid } = req.params;
    const call = await logsService.getCallDetails(callSid);
    res.json(call);
  } catch (error) {
    next(error);
  }
};

const getTranscriptions = async (req, res, next) => {
  try {
    const { limit } = req.query;
    const transcriptions = await logsService.getTranscriptions({ limit });
    res.json(transcriptions);
  } catch (error) {
    next(error);
  }
};

const getTranscriptionDetails = async (req, res, next) => {
  try {
    const { transcriptionSid } = req.params;
    const transcription = await logsService.getTranscriptionDetails(transcriptionSid);
    res.json(transcription);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCallLogs,
  getCallDetails,
  getTranscriptions,
  getTranscriptionDetails
};