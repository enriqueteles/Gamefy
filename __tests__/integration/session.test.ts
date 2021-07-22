import { UserService } from './../../src/services/UserService';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from './../../src/repositories/UserRepository';
import request from 'supertest';

import app from '../../src/app';
import connection from '../../src/database';

const userService = new UserService;

beforeAll(async ()=>{
  await connection.create();
});

afterAll(async ()=>{
  await connection.close();
});

beforeEach(async () => {
  await connection.clear();
});


describe('Authentication', () => {
  it('should authenticate with valid credentials', async () => {
    // await createTypeormConn();
    
    const user = await userService.createUser({
      name: "Tulipa",
      email: "tulipa@email.com",
      username: "tualipa",
      password: "123456",
      is_super: false
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: "123456"
      })

    expect(response.status).toBe(200);

  })
});