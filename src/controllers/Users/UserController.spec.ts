import request from 'supertest';
import { getCustomRepository } from 'typeorm';

import connection from '@database/.';
import { UserRepository } from '@repositories/UserRepository';
import { UserService } from '@services/User/UserService';
import { app } from '@src/app';

const userService = new UserService;

describe('Create User Controller', () => {

  it('should be able to create a new user', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: "Tulipa",
        email: "tulipa@email.com",
        username: "tualipa",
        password: "123456",
      })

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
  });

  it('should not be able to create an exiting user', async () => {
    await request(app)
      .post('/users')
      .send({
        name: "Test Existing Name",
        email: "textexisting@test.com",
        username: "testexisting",
        password: "123456"
      });

    const response = await request(app)
      .post('/users')
      .send({
        name: "Test Existing Name",
        email: "textexisting@test.com",
        username: "testexisting",
        password: "123456"
      });

    expect(response.status).toBe(400);

  });

});