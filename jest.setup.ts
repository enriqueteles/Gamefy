import connection from './src/database';

beforeAll(async () => {
  await connection.create();
  // mocks
});

beforeEach(async () => {
  await connection.clear();
})

afterAll(async () => {
  await connection.clear();
  await connection.close();
});
