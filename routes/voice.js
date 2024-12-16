const express = require('express');
const router = express.Router();
const {
  handleIncomingCall,
  handleOutboundCall,
  handleRecordingStatus,
  handleTranscription,
  getRecordings
} = require('../controllers/voiceController');

router.post('/call', (req, res, next) => {
  const { direction } = req.body;
  
  if (direction === 'outbound') {
    return handleOutboundCall(req, res, next);
  }
  return handleIncomingCall(req, res, next);
});

router.post('/recording-status', handleRecordingStatus);
router.post('/transcription', handleTranscription);
router.get('/recordings', getRecordings);

module.exports = router;