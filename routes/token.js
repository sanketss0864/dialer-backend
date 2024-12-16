const express = require('express');
const router = express.Router();
const { generateToken } = require('../controllers/tokenController');

router.post('/generate', generateToken);

module.exports = router;