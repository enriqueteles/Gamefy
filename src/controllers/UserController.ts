import { UserService } from './../services/UserService';
import { Request, Response } from "express";


export class UserController {
  async createUser(request: Request, response: Response)  {
    const {
      name,
      email,
      username,
      password,
      is_super
    } = request.body;

    const userService = new UserService();

    const user = await userService.createUser({
      name, 
      email, 
      username, 
      password, 
      is_super
    });

    return response.json(user);
  }
}