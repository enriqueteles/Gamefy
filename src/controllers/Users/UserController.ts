import { Request, Response } from 'express';

import { UserService } from '@services/User/UserService';

const userService = new UserService();

export class UserController {
  async index(request: Request, response: Response) {
    const users = await userService.index();
    return response.json(users);
  }
  
  async createUser(request: Request, response: Response)  {
    const {
      name,
      email,
      username,
      password,
      is_super
    } = request.body;

    const user = await userService.createUser({
      name, 
      email, 
      username, 
      password, 
      is_super
    });

    return response.json(user);
  }

  async login(request: Request, response: Response) {
    const { email, password } = request.body;

    const userService = new UserService();

    const token = await userService.authenticateUser({
      email,
      password
    });

    return response.json(token);
  }

}