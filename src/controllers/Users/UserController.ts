import { Request, Response } from 'express';

import { IRequestToken } from '@controllers/IRequestToken';
import { UserService } from '@services/User/UserService';

import { IRequestTokenFile } from '../IRequestTokenFile';

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

    const user = await userService.authenticateUser({
      email,
      password
    });

    return response.json(user);
  }

  async setProfileImage(request: IRequestTokenFile, response: Response) {
    const user_id = request.user_id;
    const file = request.file;

    const user = await userService.updateProfileUrl({
      user_id, 
      file
    });

    return response.json(user);
  }

}