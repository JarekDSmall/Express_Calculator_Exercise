const request = require('supertest');
const app = require('../app');

describe('GET /mean', () => {
  it('should calculate the mean of provided numbers', async () => {
    const response = await request(app).get('/mean?nums=1,2,3,4');
    expect(response.status).toBe(200);
    expect(response.body.operation).toBe('mean');
    expect(response.body.value).toBe(2.5);
  });

  it('should handle invalid numbers', async () => {
    const response = await request(app).get('/mean?nums=1,2,foo');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid number(s) provided');
  });

  it('should handle empty input', async () => {
    const response = await request(app).get('/mean');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('nums are required');
  });
});

describe('GET /median', () => {
  // Write similar test cases for median operation
});

describe('GET /mode', () => {
  // Write similar test cases for mode operation
});
