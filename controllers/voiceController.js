const callService = require('../services/callService');
const recordingService = require('../services/recordingService');
const twimlGenerator = require('../utils/twimlGenerator');
const recordingHelper = require('../utils/recordingHelper');
import VoiceResponse from 'twilio/lib/twiml/VoiceResponse';


const handleIncomingCall = (req, res, next) => {
  try {
    const recordingOptions = recordingHelper.getRecordingOptions(req);
    const twiml = twimlGenerator.generateIncomingCallTwiml(recordingOptions);
    res.type('text/xml');
    res.send(twiml.toString());
  } catch (error) {
    next(error);
  }
};

const handleOutboundCall = async (req, res, next) => {
  const { to, from } = req.body;
  const recordingOptions = recordingHelper.getRecordingOptions(req);
  
  try {
    const call = await callService.makeOutboundCall(to, from, recordingOptions);
    res.json({ success: true, callSid: call.sid });
  } catch (error) {
    next(error);
  }
};


const voiceResponse =async (req, res, next)=>{
  requestBody=req
  const toNumberOrClientName = requestBody.To;
  const callerId = +18304838189;
  let twiml = new VoiceResponse();

  // If the request to the /voice endpoint is TO your Twilio Number, 
  // then it is an incoming call towards your Twilio.Device.
  if (toNumberOrClientName == callerId) {
    let dial = twiml.dial();

    // This will connect the caller with your Twilio.Device/client 
    dial.client(identity);

  } else if (requestBody.To) {
    // This is an outgoing call

    // set the callerId
    let dial = twiml.dial({ callerId });

    // Check if the 'To' parameter is a Phone Number or Client Name
    // in order to use the appropriate TwiML noun 
    const attr = isAValidPhoneNumber(toNumberOrClientName)
      ? "number"
      : "client";
    dial[attr]({}, toNumberOrClientName);
  } else {
    twiml.say("Thanks for calling!");
  }

  return twiml.toString();
};


function isAValidPhoneNumber(number) {
  return /^[\d\+\-\(\) ]+$/.test(number);
}


const handleRecordingStatus = async (req, res, next) => {
  const { RecordingUrl, RecordingSid, CallSid, RecordingStatus } = req.body;
  
  try {
    if (RecordingStatus === 'completed') {
      await recordingService.saveRecording(RecordingSid, CallSid);
      const twiml = twimlGenerator.generateRecordingCompleteTwiml();
      res.type('text/xml');
      res.send(twiml.toString());
    } else {
      res.sendStatus(200);
    }
  } catch (error) {
    next(error);
  }
};

const handleTranscription = async (req, res, next) => {
  const { TranscriptionText, TranscriptionStatus, RecordingSid } = req.body;
  
  try {
    if (TranscriptionStatus === 'completed') {
      console.log(`Transcription completed for recording ${RecordingSid}: ${TranscriptionText}`);
    }
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

const getRecordings = async (req, res, next) => {
  try {
    const recordings = await callService.getRecordings();
    res.json(recordings);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleIncomingCall,
  handleOutboundCall,
  handleRecordingStatus,
  handleTranscription,
  getRecordings
};