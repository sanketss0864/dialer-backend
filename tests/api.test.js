const request = require('supertest');
const app = require('../index');

describe('API Endpoints', () => {
  describe('POST /token/generate', () => {
    it('should generate token with valid identity', async () => {
      const res = await request(app)
        .post('/token/generate')
        .send({ identity: 'user123' });
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('token');
    });

    it('should return error without identity', async () => {
      const res = await request(app)
        .post('/token/generate')
        .send({});
      
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('POST /voice/outbound', () => {
    it('should initiate call with valid phone numbers', async () => {
      const res = await request(app)
        .post('/voice/outbound')
        .send({
          to: '+1234567890',
          from: '+18304838189'
        });
      
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('callSid');
    });
  });
});