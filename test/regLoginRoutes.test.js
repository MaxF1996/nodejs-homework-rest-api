const mongoose = require('mongoose');

const request = require('supertest');

const app = require('../app');

const { User } = require('../models');

const { PORT, DB_HOST_TEST } = process.env;

let server = null;

// Create  user and test register rout

describe('test register route', () => {
  beforeAll(async () => {
    await mongoose.connect(DB_HOST_TEST);
    server = app.listen(PORT);
  });

  beforeEach(() => {});

  test('Test correct registration data ', async () => {
    const loginData = {
      email: 'hiwamgrets@gmail.com.ua',
      password: 'examplepassword',
    };

    const { body, statusCode } = await request(app).post('/api/users/register').send(loginData);

    expect(statusCode).toBe(201);
    expect(body.user && typeof body.user === 'object').toBe(true);
    expect(body.user.email).toBe(loginData.email);
    expect(typeof body.user.subscription).toBe('string');
  });

  test('Test bad registration request without email', async () => {
    const loginData = {
      password: 'examplepassword',
    };
    const { body, statusCode } = await request(app).post('/api/users/register').send(loginData);

    expect(statusCode).toBe(400);
    expect(body.message).toBe('"email" is required');
  });

  test('Test bad registration request without password', async () => {
    const loginData = {
      email: 'hiwamgrets@gmail.com.ua',
    };
    const { body, statusCode } = await request(app).post('/api/users/register').send(loginData);

    expect(statusCode).toBe(400);
    expect(body.message).toBe('"password" is required');
  });

  test('Test bad registration request with already has user ', async () => {
    const loginData = {
      email: 'hiwamgrets@gmail.com.ua',
      password: 'examplepassword',
    };
    const { body, statusCode } = await request(app).post('/api/users/register').send(loginData);

    expect(statusCode).toBe(409);
    expect(body.message).toBe('Email in use');
  });
});

// Test login route and the and remove user data

describe('test login route', () => {
  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  test('Test correct login data ', async () => {
    const loginData = {
      email: 'hiwamgrets@gmail.com.ua',
      password: 'examplepassword',
    };

    const { body, statusCode } = await request(app).post('/api/users/login').send(loginData);

    expect(statusCode).toBe(200);
    expect(body.user && typeof body.user === 'object').toBe(true);
    expect(body.user.email).toBe(loginData.email);
    expect(typeof body.user.subscription).toBe('string');
    expect(typeof body.token).toBe('string');
  });

  test('Test bad request without email', async () => {
    const loginData = {
      password: 'examplepassword',
    };
    const { body, statusCode } = await request(app).post('/api/users/login').send(loginData);

    expect(statusCode).toBe(400);
    expect(body.message).toBe('"email" is required');
  });

  test('Test bad request without password', async () => {
    const loginData = {
      email: 'hiwamgrets@gmail.com.ua',
    };
    const { body, statusCode } = await request(app).post('/api/users/login').send(loginData);

    expect(statusCode).toBe(400);
    expect(body.message).toBe('"password" is required');
  });

  test('Test bad request with wrong email or password', async () => {
    const loginData = {
      email: 'hiwamgrets@gmai.com.ua',
      password: 'examplepasswor',
    };
    const { body, statusCode } = await request(app).post('/api/users/login').send(loginData);

    expect(statusCode).toBe(401);
    expect(body.message).toBe('Email or password is wrong');
  });
});
