import { Connection } from 'typeorm';
import { setConnectionOptions, useRefreshDatabase, useSeeding } from 'typeorm-seeding';

import connection from './src/database';

beforeAll(async () => {
  await connection.create();

  // connect typeorm-seeding
  let conn: Connection;
  setConnectionOptions({
    type: 'sqlite',
    database: ':memory:',
    entities: ['src/entities/**/*{.ts,.js}'],
  })
  conn = await useRefreshDatabase();
  await useSeeding();
});

beforeEach(async () => {
  await connection.clear();
})

afterAll(async () => {
  await connection.clear();
  await connection.close();
});
