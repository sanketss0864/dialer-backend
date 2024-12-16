# Twilio VoIP Server API Documentation

## POST Endpoints

### 1. Generate Access Token
Generate a token for client authentication.

**Endpoint:** `POST /token/generate`

**Request Body:**
```json
{
  "identity": "user123"
}
```

**Success Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error Response:**
```json
{
  "error": "Identity is required"
}
```

### 2. Handle Outbound Call
Initiate an outbound call.

**Endpoint:** `POST /voice/outbound`

**Request Body:**
```json
{
  "to": "+1234567890",
  "from": "+18304838189"  // Optional, defaults to CALLER_ID from env
}
```

**Success Response:**
```json
{
  "success": true,
  "callSid": "CA1234567890abcdef"
}
```

**Error Response:**
```json
{
  "error": "Invalid phone number format"
}
```

### 3. Handle Recording Status
Webhook endpoint for recording status updates.

**Endpoint:** `POST /voice/recording-status`

**Request Body (Twilio Webhook):**
```json
{
  "RecordingUrl": "https://api.twilio.com/recordings/RE123...",
  "RecordingSid": "RE1234567890abcdef",
  "CallSid": "CA1234567890abcdef",
  "RecordingStatus": "completed"
}
```

**Success Response:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say>Recording completed. Goodbye!</Say>
  <Hangup/>
</Response>
```

### 4. Handle Transcription
Webhook endpoint for transcription updates.

**Endpoint:** `POST /voice/transcription`

**Request Body (Twilio Webhook):**
```json
{
  "TranscriptionText": "Hello, this is a test call.",
  "TranscriptionStatus": "completed",
  "RecordingSid": "RE1234567890abcdef",
  "TranscriptionSid": "TR1234567890abcdef"
}
```

**Success Response:**
```
200 OK
```

## Example Usage with cURL

### Generate Token
```bash
curl -X POST http://localhost:3010/token/generate \
  -H "Content-Type: application/json" \
  -d '{"identity": "user123"}'
```

### Make Outbound Call
```bash
curl -X POST http://localhost:3010/voice/outbound \
  -H "Content-Type: application/json" \
  -d '{
    "to": "+1234567890",
    "from": "+18304838189"
  }'
```

## Testing Webhooks Locally

For testing webhooks locally, you can use tools like ngrok to create a public URL:

1. Install ngrok: `npm install -g ngrok`
2. Start your server: `npm start`
3. Create tunnel: `ngrok http 3010`
4. Use the ngrok URL in your Twilio console for webhook configurations

## Error Handling

All endpoints follow a consistent error response format:

```json
{
  "error": "Error message",
  "message": "Detailed error description"
}
```

Common HTTP status codes:
- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Internal Server Error