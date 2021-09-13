import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IRequestUser extends Request {
  user_id: string
}

interface IPayload {
  sub: string
}

export class Auth {

  async authenticate(request: IRequestUser, response: Response, next: NextFunction) {
    // recebe token
    const authToken = request.headers.authorization;
  
    // valida se token está preenchido
    if (!authToken)
      return response.status(401).end();
  
    const [, token] = authToken.split(" "); // padrão "Bearer token"
  
    try {
      // valida se token estao preenchido
      const { sub } = verify(token, process.env.ACCESS_TOKEN_SECRET) as IPayload;
  
      // recupera informações do usuário
      request.user_id = sub;
  
      return next();
    } catch(err) {
      return response.status(401).end();
    }
  
  }
}

