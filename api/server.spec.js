const request = require('supertest');
const server = require('./server');

describe('server', () => {
  describe('[GET] / endpoint', () => {
    it('is in testing environment', () => {
      expect(process.env.NODE_ENV).toBe('testing')
    });
    it('returns 200 OK status', async () => {
      const response = await request(server).get('/')
      expect(response.status).toBe(200)
    });
    it('returns "Welcome to test server!"', () => {
      return request(server).get('/')
        .expect(200)
        .expect("Welcome to test server!")
        .expect('Content-Length', '23')
    });
  });
});