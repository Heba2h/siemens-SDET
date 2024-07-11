
const request = require('supertest');
const express = require('express');
import app from '../app';
const { expect } = require('chai');
 
    
describe('API Routes', () => {
  
  // creating users before all test cases 
  before(async() => {

    const user1 = await request(app)
          .post('/api/v1/users')
          .send({name:'Tester', email: 'test@example.com', password: 'password123' });

    const user2 = await request(app)
          .post('/api/v1/users')
          .send({name:'heba', email: 'heba@example.com', password: 'password123' });

    const user3 = await request(app)
    .post('/api/v1/users')
    .send({name:'user3', email: 'user@example.com', password: 'password123' });
  });

  it('should authenticate a user', async () => {
    const response = await request(app)
      .post('/api/v1/auth')
      .send({ email: 'test@example.com', password: 'password123' });

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('token');
  });

  it('should fail to authenticate a user with incorrect credentials', async () => {
    const response = await request(app)
      .post('/api/v1/auth')
      .send({ email: 'wrong@example.com', password: 'wrongpassword' });

    expect(response.status).to.equal(401);
    expect(response.body).to.have.property('message', 'Incorrect email or password');
  });

  it('should register a new user', async () => {
    const response = await request(app)
      .post('/api/v1/users')
      .send({ name: 'New User', email: 'newuser@example.com', password: 'password123' });

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('message', 'User registered with success');
    expect(response.body).to.have.property('token');
  }); //! BUG: TOKEN IS NOT RETURNED 

  it('should fail to register an existing user', async () => {
    const response = await request(app)
      .post('/api/v1/users')
      .send({name:'Tester', email: 'test@example.com', password: 'password123' });

    expect(response.status).to.equal(401);
    expect(response.body).to.have.property('message', 'User already registered');
  });

  it('should get user data', async () => {
    const authResponse = await request(app)
      .post('/api/v1/auth')
      .send({ email: 'test@example.com', password: 'password123' });

    const token = authResponse.body.token;

    const response = await request(app)
      .get('/api/v1/users')
      .set('Authorization', token);

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('name');
    expect(response.body).to.have.property('email');
  });

  it('should fail to get user data with invalid token', async () => {
    const response = await request(app)
      .get('/api/v1/users')
      .set('Authorization', 'invalidtoken');

    expect(response.status).to.equal(403);
    expect(response.body).to.have.property('message', 'Unauthorized');
  });

  it('should update user data', async () => {
    const authResponse = await request(app)
      .post('/api/v1/auth')
      .send({ email: 'heba@example.com', password: 'password123' });

    const token = authResponse.body.token;

    const response = await request(app)
      .patch('/api/v1/users')
      .set('Authorization', token)
      .send({ name: 'Updated User' });

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('message', 'User updated with success!');
    expect(response.body).to.have.property('data');
    expect(response.body.data).to.have.property('name', 'Updated User');
  });

  it('should delete a user', async () => {
    const authResponse = await request(app)
      .post('/api/v1/auth')
      .send({ email: 'user@example.com', password: 'password123' });

    const token = authResponse.body.token;

    const response = await request(app)
      .delete('/api/v1/users')
      .set('Authorization', token)
      .send();

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('message', 'User deleted with success!');
  });

  it('should fail to delete a user with invalid token', async () => {
    const response = await request(app)
      .delete('/api/v1/users')
      .set('Authorization', 'invalidtoken')
      .send({ email: 'user@example.com' });

    expect(response.status).to.equal(403);
    expect(response.body).to.have.property('message', 'Unauthorized to delete');
  });

  it('should delete all users with correct admin key', async () => {
    const response = await request(app)
      .delete('/api/v1/all-users')
      .send({ key_admin: 'keyadmin123' });

    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('message', 'Users deleted with success');
  });

  it('should fail to delete all users with incorrect admin key', async () => {
    const response = await request(app)
      .delete('/api/v1/all-users')
      .send({ key_admin: 'wrongkey' });

    expect(response.status).to.equal(403);
    expect(response.body).to.have.property('message', 'Unauthorized access');
  });
});