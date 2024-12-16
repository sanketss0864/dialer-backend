const client = require('./twilioClient');
const config = require('../config/twilio');

const saveRecording = async (recordingSid, callSid) => {
  try {
    const recording = await client.recordings(recordingSid).fetch();
    // You can implement additional storage logic here
    return recording;
  } catch (error) {
    console.error('Error saving recording:', error);
    throw error;
  }
};

const deleteRecording = async (recordingSid) => {
  try {
    await client.recordings(recordingSid).remove();
    return true;
  } catch (error) {
    console.error('Error deleting recording:', error);
    throw error;
  }
};

const getRecordingUrl = async (recordingSid) => {
  try {
    const recording = await client.recordings(recordingSid).fetch();
    return recording.mediaUrl;
  } catch (error) {
    console.error('Error getting recording URL:', error);
    throw error;
  }
};

module.exports = {
  saveRecording,
  deleteRecording,
  getRecordingUrl
};