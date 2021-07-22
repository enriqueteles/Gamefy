import { getCustomRepository } from 'typeorm';
import { UserRepository } from '@repositories/UserRepository';


interface IUserRequest {
  name: string;
  email: string;
  username: string;
  password: string;
  is_super?: boolean;
}

export class UserService {
  async createUser({
    name,
    email,
    username,
    password,
    is_super
  } : IUserRequest) {
    const userRepository = getCustomRepository(UserRepository);

    if(!email) {
      throw new Error("Email incorrect");
    }

    const userAlreadyExists = await userRepository.findOne({
      email
    });

    if(userAlreadyExists) {
      throw new Error("User already exists");
    }

    const user = userRepository.create({
      name,
      email,
      username,
      password,
      is_super,
      image_medium_url: "default-profile.png"
    });

    await userRepository.save(user);

    return user;
  }
}