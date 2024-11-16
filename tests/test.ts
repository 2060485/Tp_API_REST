import { describe, expect, test, afterAll } from '@jest/globals';
import supertest from 'supertest';
import httpApp from '../src/app';
import Product from '../src/models/product_V2.model';
import mongoose from 'mongoose';

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

describe('GET /v2/products sucess', () => {
  test('should return status code 200', async () => {
    const response = await agent.get('/v2/products').set('Authorization', token);
    expect(response.status).toBe(200);
  });
  test('should return status code 200 with sorted values', async () => {
    const response = await agent.get('/v2/products?minPrice=10&maxPrice=100&minStock=5&maxStock=200').set('Authorization', token);
    expect(response.status).toBe(200);
  });
});

describe('GET /v2/products fail', () => {
  test('should return status code 403 with no token', async () => {
    const response = await agent.get('/v2/products');
    expect(response.status).toBe(403);
  });
  test('should return status code 401 with invalid token', async () => {
    const response = await agent.get('/v2/products').set('Authorization', "notValid");
    expect(response.status).toBe(401);
  });
});

describe('POST /v2/products sucess', () => {
  test('should return status code 201', async () => {
    const product = {
      title: "Sample Product",
      price: 19.99,
      description: "This is a great product.",
      count: 10
    };
    const response = await agent.post('/v2/products')
    .set('Authorization', token)
    .set('Role',"Admin").send(product);
    expect(response.status).toBe(201);
  });
});

describe('POST /v2/products fail', () => {
  test('should return status code 401 with invalid Role', async () => {
    const product = {
      title: "Sample Product",
      price: 19.99,
      description: "This is a great product.",
      count: 10
    };
    const response = await agent.post('/v2/products')
    .set('Authorization', token)
    .set('Role',"Test").send(product);
    expect(response.status).toBe(401);
  });
  test('should return status code 400 with missing values', async () => {
    const product = {
      title: "Sample Product",
      price: 19.99,
      count: 10
    };
    const response = await agent.post('/v2/products')
    .set('Authorization', token)
    .set('Role',"Admin").send(product);
    expect(response.status).toBe(400);
  });
  test('should return status code 400 with title too short', async () => {
    const product = {
      title: "AB",
      price: 19.99,
      description: "This is a great product.",
      count: 10
    };
    const response = await agent.post('/v2/products')
    .set('Authorization', token)
    .set('Role',"Admin").send(product);
    expect(response.status).toBe(400);
  });
  test('should return status code 400 with invalid price', async () => {
    const product = {
      title: "Sample Product",
      price: -5,
      description: "This is a great product.",
      count: 10
    };
    const response = await agent.post('/v2/products')
    .set('Authorization', token)
    .set('Role',"Admin").send(product);
    expect(response.status).toBe(400);
  });
  test('should return status code 400 with invalid count', async () => {
    const product = {
      title: "Sample Product",
      price: 19.99,
      description: "This is a great product.",
      count: 0
    };
    const response = await agent.post('/v2/products')
    .set('Authorization', token)
    .set('Role',"Admin").send(product);
    expect(response.status).toBe(400);
  });
});

describe('PUT /v2/products/:id sucess', () => {
  test('should return status code 200', async () => {
    const product = {
      title: "Updated Product",
      price: 29.99,
      description: "This is a updated product.",
      count: 15
    };
    const productToUpdate = await Product.findOne({ name: "Sample Product" });
    const response = await agent.put('/v2/products/'+productToUpdate._id)
    .set('Authorization', token)
    .set('Role',"Admin").send(product);
    expect(response.status).toBe(200);
  });
});

describe('PUT /v2/products/:id fail', () => {
  test('should return status code 400 with missing values', async () => {
    const product = {
      price: 29.99,
      description: "This is a updated product.",
      count: 15
    };
    const productToUpdate = await Product.findOne({ name: "Updated Product" });
    const response = await agent.put('/v2/products/'+productToUpdate._id)
    .set('Authorization', token)
    .set('Role',"Admin").send(product);
    expect(response.status).toBe(400);
  });
  test('should return status code 404 with product not existing', async () => {
    const product = {
      title: "Updated Product",
      price: 29.99,
      description: "This is a updated product.",
      count: 15
    };
    const response = await agent.put('/v2/products/Test')
    .set('Authorization', token)
    .set('Role',"Admin").send(product);
    expect(response.status).toBe(404);
  });
});

describe('DELETE /v2/products/:id sucess', () => {
  test('should return status code 204', async () => {
    const productToUpdate = await Product.findOne({ name: "Updated Product" });
    const response = await agent.delete('/v2/products/'+productToUpdate._id)
    .set('Authorization', token)
    .set('Role',"Admin").send({});;
    expect(response.status).toBe(204);
  });
});

describe('DELETE /v2/products/:id fail', () => {
  test('should return status code 401 with wrong role', async () => {
    const productToUpdate = await Product.findOne({ name: "DANVOUY Womens T Shirt Casual Cotton Short" });
    const response = await agent.delete('/v2/products/'+productToUpdate._id)
    .set('Authorization', token)
    .set('Role',"Test").send({});;
    expect(response.status).toBe(401);
  });
  test('should return status code 404 with product not existing', async () => {
    const response = await agent.delete('/v2/products/Test')
    .set('Authorization', token)
    .set('Role',"Admin").send({});;
    expect(response.status).toBe(404);
  });
});

describe('SQL injections test', () => {
  test('should resist attack', async () => {
    const sqlQuery = "'; DROP TABLE products; --";
    const response = await agent
    .post('/v2/products')
    .set('Authorization', token)
    .set('Role', 'Admin')
    .send({ name: sqlQuery, price: 100 });

    expect(response.status).not.toBe(500);
    expect(response.status).toBe(400);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});