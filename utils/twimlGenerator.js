const twilio = require('twilio');
const VoiceResponse = twilio.twiml.VoiceResponse;

const generateIncomingCallTwiml = () => {
  const twiml = new VoiceResponse();
  twiml.say('Incoming call received. Recording will start now.');
  twiml.record({
    action: '/voice/recording-status',
    transcribe: true,
    transcribeCallback: '/voice/transcription',
    maxLength: 3600
  });
  return twiml;
};

const generateRecordingCompleteTwiml = () => {
  const twiml = new VoiceResponse();
  twiml.say('Recording completed. Goodbye!');
  twiml.hangup();
  return twiml;
};

module.exports = {
  generateIncomingCallTwiml,
  generateRecordingCompleteTwiml
};