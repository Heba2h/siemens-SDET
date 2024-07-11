const request = require('supertest');
const express = require('express');
const mockUserAuth = require('./mockUserAuth');

const app = express();
app.use(express.json());
app.use(mockUserAuth());

describe('Mock User Auth API', () => {
  test('POST /api/auth/login - valid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'admin', password: 'password' });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token', 'valid-token');
  });

  test('POST /api/auth/login - invalid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'admin', password: 'wrongpassword' });

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('message', 'Invalid credentials');
  });

  test('POST /api/auth/register - valid data', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'newuser', password: 'newpassword', role: 'user' });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'User registered successfully');
  });

  test('POST /api/auth/register - missing password', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'newuser', role: 'user' });

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Password is required');
  });

  test('GET /api/protected - valid token', async () => {
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ username: 'admin', password: 'password' });

    const token = loginRes.body.token;

    const res = await request(app)
      .get('/api/protected')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'This is a protected route');
  });

  test('GET /api/protected - invalid token', async () => {
    const res = await request(app)
      .get('/api/protected')
      .set('Authorization', 'Bearer invalidtoken');

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('message', 'Unauthorized');
  });

  test('GET /api/protected - no token', async () => {
    const res = await request(app)
      .get('/api/protected');

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('message', 'No token provided');
  });
});
