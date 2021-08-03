import request from 'supertest';
import { getCustomRepository } from 'typeorm';

import connection from '@database/.';
import { User } from '@entities/User';
import { UserRepository } from '@repositories/UserRepository';
import { UserService } from '@services/User/UserService';
import { app } from '@src/app';

import { IAuthenticateRequest } from './IUserAuthenticateRequest';
import { IUserCreate } from './IUserCreate';

describe('Create User Service', () => {
  let userRepository : UserRepository;
  let userService : UserService;
  
  
  beforeAll(async () => {
    userRepository = getCustomRepository(UserRepository);
    userService = new UserService;
  });
  
  it('should be able to create a new user', async () => {
    const userData : IUserCreate = {
      name: "Tulipa",
      email: "tulipa@email.com",
      username: "tualipa",
      password: "123456"
    };

    const user = await userService.createUser(userData);

    expect(user).toHaveProperty('id');
    expect(user.email).toBe(userData.email);
  });

  it("should not be able to create an existing user", async () => {
    const userData : IUserCreate = {
      name: "Test Existing Name",
      email: "textexisting@test.com",
      username: "testexisting",
      password: "123456"
    };

    await userService.createUser(userData);

    await expect(userService.createUser(userData))
      .rejects
      .toThrowError("User already exists");

  });

  it('should be able to login', async () => {
    const userData : IUserCreate = {
      name: "Test Existing Name",
      email: "textexisting@test.com",
      username: "usersecond",
      password: "123456"
    };

    await userService.createUser(userData);

    const userLogin : IAuthenticateRequest = {
      email: "textexisting@test.com",
      password: "123456"
    };

    const response = await userService.authenticateUser(userLogin);

    expect(response)
      .toBeTruthy()
  });

  it('should not be able to login, invalid email', async () => {
    const userLogin : IAuthenticateRequest = {
      email: "textexisting@test.com",
      password: "123456"
    };

    await expect(userService.authenticateUser(userLogin))
      .rejects
      .toThrowError("Email incorrect");
  });
  
  it('should not be able to login, invalid password', async () => {
    const userData : IUserCreate = {
      name: "Test Existing Name",
      email: "textexisting@test.com",
      username: "usersecond",
      password: "123456"
    };

    await userService.createUser(userData);
    
    const userLogin : IAuthenticateRequest = {
      email: "textexisting@test.com",
      password: "6543211"
    };

    await expect(userService.authenticateUser(userLogin))
      .rejects
      .toThrowError("Password incorrect");
  });


});