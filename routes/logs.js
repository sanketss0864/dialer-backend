const express = require('express');
const router = express.Router();
const {
  getCallLogs,
  getCallDetails,
  getTranscriptions,
  getTranscriptionDetails
} = require('../controllers/logsController');

// Call logs routes
router.get('/calls', getCallLogs);
router.get('/calls/:callSid', getCallDetails);

// Transcription routes
router.get('/transcriptions', getTranscriptions);
router.get('/transcriptions/:transcriptionSid', getTranscriptionDetails);

module.exports = router;