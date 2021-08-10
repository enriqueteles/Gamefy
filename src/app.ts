import 'express-async-errors';

import cors from 'cors';
// const cors = require('cors');
import * as dotenv from 'dotenv';
import express, { Application, NextFunction, Request, Response } from 'express';
import { createConnection } from 'typeorm';

import router from './router';

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

const database = async ()  => {
  await createConnection();
}

const app = express();

app.use(express.json());

// cors
const options: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
  ],
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: '*',
  preflightContinue: false,
}
app.use(cors(options));


// routes
app.use(router);

// erros
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if(err instanceof Error) {
    return response.status(400).json({
      error: err.message
    });
  }

  return response.status(500).json({
    status: "error",
    message: `Internal Server Error - ${err}`
  });

});

export { app };
