import { Request } from 'express';

export interface IRequestToken extends Request {
  user_id: string
}