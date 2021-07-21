import express, { Application } from 'express';

import router from './router';
import './database';


class AppController {
  public express: Application;

  constructor() {
    this.express = express();

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
