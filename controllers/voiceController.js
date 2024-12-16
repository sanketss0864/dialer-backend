const callService = require('../services/callService');
const twimlGenerator = require('../utils/twimlGenerator');

const handleIncomingCall = (req, res) => {
  const twiml = twimlGenerator.generateIncomingCallTwiml();
  res.type('text/xml');
  res.send(twiml.toString());
};

const handleOutboundCall = async (req, res) => {
  const { to, from } = req.body;
  const baseUrl = `${req.protocol}://${req.get('host')}`;
  
  try {
    const call = await callService.makeOutboundCall(to, from, baseUrl);
    res.json({ success: true, callSid: call.sid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleRecordingStatus = (req, res) => {
  const { RecordingUrl, RecordingSid, CallSid } = req.body;
  console.log(`Recording completed: ${RecordingUrl}`);
  
  const twiml = twimlGenerator.generateRecordingCompleteTwiml();
  res.type('text/xml');
  res.send(twiml.toString());
};

const handleTranscription = (req, res) => {
  const { TranscriptionText, TranscriptionStatus, RecordingSid } = req.body;
  console.log(`Transcription completed: ${TranscriptionText}`);
  res.sendStatus(200);
};

const getRecordings = async (req, res) => {
  try {
    const recordings = await callService.getRecordings();
    res.json(recordings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  handleIncomingCall,
  handleOutboundCall,
  handleRecordingStatus,
  handleTranscription,
  getRecordings
};