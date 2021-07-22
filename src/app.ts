import express, { Application } from 'express';

import router from './router';
import connection from './database';

import * as dotenv from 'dotenv';
dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

class AppController {
  public express: Application;

  constructor() {
    this.express = express();

    // createTypeormConn();
    connection.create();
    
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(express.json());
  }

  routes() {
    this.express.use(router);
  }
}

export default new AppController().express;
