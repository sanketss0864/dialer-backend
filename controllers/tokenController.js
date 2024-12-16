const tokenService = require('../services/tokenService');

const generateToken = (req, res) => {
  const { identity } = req.body;
  
  if (!identity) {
    return res.status(400).json({ error: 'Identity is required' });
  }

  const token = tokenService.generateAccessToken(identity);
  res.json({ token });
};

module.exports = {
  generateToken
};