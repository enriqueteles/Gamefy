import { createConnection } from 'typeorm';
import express, { Application, NextFunction, Request, Response } from 'express';
import "express-async-errors";

import router from './router';
// import connection from './database';
// import './database';

import * as dotenv from 'dotenv';
dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

const database = async ()  => {
  await createConnection();
}

const app = express();

app.use(express.json());

// database
// database();
// createConnection();
// middleware

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

// class AppController {
//   public express: Application;

//   constructor() {
//     // createConnection()
//       // .then(async () => {

//       //   this.express = express();
    
//       //   this.middlewares();
//       //   this.routes();
//       //   this.errors();
//       // }).catch(error => {
//       //   console.log("TypeORM connection error: ", error)
//       // })
//       this.database();

//       this.express = express();
  
//       this.middlewares();
//       this.routes();
//       this.errors();
//   }

//   async database() {
//     await createConnection();
//   }

//   middlewares() {
//     this.express.use(express.json());
//   }

//   routes() {
//     this.express.use(router);
//   }

//   errors() {
//     this.express.use((err: Error, request: Request, response: Response, next: NextFunction) => {
//       if(err instanceof Error) {
//         return response.status(400).json({
//           error: err.message
//         })
//       }

//       return response.status(500).json({
//         status: "error",
//         message: "Internal Server Error"
//       })

//     })
//   }
// }

// export default new AppController().express;
