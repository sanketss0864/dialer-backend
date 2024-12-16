const twilio = require('twilio');
const VoiceResponse = twilio.twiml.VoiceResponse;

const generateIncomingCallTwiml = (recordingOptions) => {
  const twiml = new VoiceResponse();
  twiml.say('Incoming call received. Recording will start now.');
  
  twiml.record({
    ...recordingOptions,
    maxLength: 3600,
    timeout: 10
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