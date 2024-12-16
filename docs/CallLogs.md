# Call Logs API Documentation

## Overview
The Call Logs API provides endpoints to retrieve call history, transcriptions, and detailed call information from your Twilio VoIP service.

## Endpoints

### 1. Get Call Logs
Retrieve a list of call records with optional filtering.

**Endpoint:** `GET /logs/calls`

**Query Parameters:**
- `limit` (optional): Number of records to return (default: 50)
- `startDate` (optional): Filter calls after this date (ISO 8601 format)
- `endDate` (optional): Filter calls before this date (ISO 8601 format)

**Success Response:**
```json
{
  "calls": [
    {
      "sid": "CA1234567890abcdef",
      "from": "+1234567890",
      "to": "+1987654321",
      "status": "completed",
      "duration": "120",
      "direction": "outbound-api",
      "startTime": "2023-11-01T10:00:00Z",
      "endTime": "2023-11-01T10:02:00Z"
    }
  ],
  "meta": {
    "page": 1,
    "pageSize": 50,
    "totalCount": 100
  }
}
```

### 2. Get Call Details
Retrieve detailed information about a specific call.

**Endpoint:** `GET /logs/calls/:callSid`

**Parameters:**
- `callSid`: The unique identifier of the call

**Success Response:**
```json
{
  "sid": "CA1234567890abcdef",
  "from": "+1234567890",
  "to": "+1987654321",
  "status": "completed",
  "duration": "120",
  "direction": "outbound-api",
  "startTime": "2023-11-01T10:00:00Z",
  "endTime": "2023-11-01T10:02:00Z",
  "price": "-0.0085",
  "priceUnit": "USD",
  "recordings": [
    {
      "sid": "RE1234567890abcdef",
      "duration": "120",
      "url": "https://api.twilio.com/recordings/RE1234..."
    }
  ]
}
```

### 3. Get Transcriptions
Retrieve a list of transcriptions.

**Endpoint:** `GET /logs/transcriptions`

**Query Parameters:**
- `limit` (optional): Number of records to return (default: 50)

**Success Response:**
```json
{
  "transcriptions": [
    {
      "sid": "TR1234567890abcdef",
      "recordingSid": "RE1234567890abcdef",
      "status": "completed",
      "text": "Hello, this is a test call.",
      "duration": "120",
      "price": "-0.05",
      "priceUnit": "USD"
    }
  ],
  "meta": {
    "page": 1,
    "pageSize": 50,
    "totalCount": 100
  }
}
```

### 4. Get Transcription Details
Retrieve detailed information about a specific transcription.

**Endpoint:** `GET /logs/transcriptions/:transcriptionSid`

**Parameters:**
- `transcriptionSid`: The unique identifier of the transcription

**Success Response:**
```json
{
  "sid": "TR1234567890abcdef",
  "recordingSid": "RE1234567890abcdef",
  "callSid": "CA1234567890abcdef",
  "status": "completed",
  "text": "Hello, this is a test call.",
  "duration": "120",
  "price": "-0.05",
  "priceUnit": "USD",
  "url": "https://api.twilio.com/transcriptions/TR1234..."
}
```

## Error Responses
All endpoints follow a consistent error response format:

```json
{
  "error": "Error code",
  "message": "Detailed error description"
}
```

Common HTTP status codes:
- 400: Bad Request (invalid parameters)
- 404: Resource Not Found
- 500: Internal Server Error

## Example Usage

### Get Call Logs
```bash
# Get last 50 calls
curl http://localhost:3010/logs/calls

# Get calls within date range
curl http://localhost:3010/logs/calls?startDate=2023-11-01T00:00:00Z&endDate=2023-11-30T23:59:59Z

# Get specific number of calls
curl http://localhost:3010/logs/calls?limit=10
```

### Get Call Details
```bash
curl http://localhost:3010/logs/calls/CA1234567890abcdef
```

### Get Transcriptions
```bash
# Get last 50 transcriptions
curl http://localhost:3010/logs/transcriptions

# Get specific number of transcriptions
curl http://localhost:3010/logs/transcriptions?limit=10
```

### Get Transcription Details
```bash
curl http://localhost:3010/logs/transcriptions/TR1234567890abcdef
```