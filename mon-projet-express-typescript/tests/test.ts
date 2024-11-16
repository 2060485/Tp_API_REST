import { describe, expect, test } from '@jest/globals';
import supertest from 'supertest';
import httpApp from '../src/app';

const agent = supertest.agent(httpApp);
let token = "";

// Pour bypass le certificat https://stackoverflow.com/questions/35633829/node-js-error-process-env-node-tls-reject-unauthorized-what-does-this-mean
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

describe('GET /', () => {
  test('should return status code 200', async () => {
    const response = await agent.get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello, TypeScript with Express! Connexion sécurisée.");
  });
});

describe('POST /v1/users/register', () => {
  test('should return status code 201', async () => {
    const newUser = {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      password: "securepassword",
      role: "Admin",
      username: "johndoe"
    };

    const response = await agent.post('/v1/users/register').send(newUser);
    expect(response.status).toBe(201);
  });
});

describe('POST /v1/users/login', () => {
  test('should return status code 200', async () => {
    const user = {
      username: "johndoe",
      password: "securepassword"
    };

    const response = await agent.post('/v1/users/login').send(user);
    token = response.body.accessToken;
    expect(response.status).toBe(200);
  });
});

describe('GET /v2/products', () => {
  test('should return status code 200 with valid Authorization header', async () => {
    console.log('Token value:', token);

    const response = await agent.get('/v2/products').set('Authorization', token);
    expect(response.status).toBe(200);
  });
});
