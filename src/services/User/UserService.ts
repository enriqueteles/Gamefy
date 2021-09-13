import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';

import { UserRepository } from '@repositories/UserRepository';

import { IAuthenticateRequest } from './IUserAuthenticateRequest';
import { IUserCreate } from './IUserCreate';

export class UserService {
  
  async index() {
    const userRepository = getCustomRepository(UserRepository);

    const users = await userRepository.find();
    return users;
  }
  
  async createUser({
    name,
    email,
    username,
    password
  } : IUserCreate) {
    const userRepository = getCustomRepository(UserRepository);

    // validation
    if(!email)
      throw new Error("Email incorrect");
    if(!name)
      throw new Error("Name incorrect");
    if(!username)
      throw new Error("Username incorrect");
    if(!password)
      throw new Error("Password incorrect");

    const userAlreadyExists = await userRepository.findOne({
      email
    });

    if(userAlreadyExists) {
      throw new Error("User already exists");
    }

    // hash password
    const passwordHash = await hash(password, 8);
    
    const user = userRepository.create({
      name,
      email,
      username,
      password: passwordHash,
      is_super: false,
      image_medium_url: "default-profile.png"
    });

    await userRepository.save(user);

    return user;
  }

  async authenticateUser({
    email,
    password
  }: IAuthenticateRequest) {
    const userRepository = await getCustomRepository(UserRepository);

    // verifica se email existe
    const user = await userRepository.findOne({ 
      email
    });

    if(!user)
      throw new Error("Email incorrect");

    // verifica senha
    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch)
      throw new Error("Password incorrect");

    // gera token
    const userHashed = {
      email: user.email,
      username: user.username
    };
    
    const token = sign(userHashed, process.env.ACCESS_TOKEN_SECRET, {
      subject: user.id,
      expiresIn: "1w"
    });

    return {
      token,
      id: user.id,
      name: user.name,
      email: user.email,
      username: user.username,
      is_super: user.is_super,
      image_medium_url: user.image_medium_url,
      groups: user.groups
    };
  }

  async updateProfileUrl({
    user_id,
    file
  }) {
    const userRepository = getCustomRepository(UserRepository);
    
    // validate user
    const user = await userRepository.findOne({
      id: user_id
    });

    if(!user)
      throw new Error("User not found");

    console.log(file);
    const updated = await userRepository.update({
      id: user_id
    }, {
      image_medium_url: file.location
    })

    if(!updated)
      throw new Error("Error updating user");
    
    user.image_medium_url = file.location;

    return user;
  }

}