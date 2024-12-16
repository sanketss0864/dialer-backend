const express = require('express');
const { resolve } = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import routes
const tokenRouter = require('./routes/token');
const voiceRouter = require('./routes/voice');
const logsRouter = require('./routes/logs');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const port = process.env.PORT || 3010;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('static'));

// Routes
app.use('/token', tokenRouter);
app.use('/voice', voiceRouter);
app.use('/logs', logsRouter);

// Serve index page
app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

// Error handling
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Twilio VoIP server listening at http://localhost:${port}`);
});