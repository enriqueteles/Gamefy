import { Request } from 'express';

export interface IRequestTokenFile extends Request {
  user_id: string,
  file: Express.Multer.File
}