const express = require('express');
const router = express.Router();
const {
  handleIncomingCall,
  handleOutboundCall,
  handleRecordingStatus,
  handleTranscription,
  getRecordings
} = require('../controllers/voiceController');

router.post('/incoming', handleIncomingCall);
router.post('/outbound', handleOutboundCall);
router.post('/recording-status', handleRecordingStatus);
router.post('/transcription', handleTranscription);
router.get('/recordings', getRecordings);

module.exports = router;