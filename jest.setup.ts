import { Connection, getConnection } from 'typeorm';
import { setConnectionOptions, useRefreshDatabase, useSeeding } from 'typeorm-seeding';

import connection from './src/database';

beforeAll(async () => {
  await connection.create();

  // connect typeorm-seeding
  let conn: Connection;
  setConnectionOptions({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "typeorm",
    password: "password",
    database: process.env.DB_NAME,
  })
  conn = await useRefreshDatabase();
  await useSeeding();
});

beforeEach( async () => {
  await getConnection().synchronize(true);
})

// afterEach( async () => {
  //   await connection.clear();
  // })
  
  afterAll(async () => {
  await getConnection().synchronize(true);
  // await connection.clear();
  await connection.close();
});
