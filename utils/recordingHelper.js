const config = require('../config/twilio');

const generateRecordingWebhookUrl = (req) => {
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  return `${baseUrl}/voice/recording-status`;
};

const generateTranscriptionWebhookUrl = (req) => {
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  return `${baseUrl}/voice/transcription`;
};

const getRecordingOptions = (req) => ({
  recordingStatusCallback: generateRecordingWebhookUrl(req),
  recordingStatusCallbackEvent: ['completed', 'failed'],
  recordingChannels: 'dual',
  recordingTrack: 'both',
  transcribe: true,
  transcribeCallback: generateTranscriptionWebhookUrl(req)
});

module.exports = {
  getRecordingOptions,
  generateRecordingWebhookUrl,
  generateTranscriptionWebhookUrl
};