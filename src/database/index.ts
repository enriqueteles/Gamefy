import { createConnection, getConnection, getConnectionOptions } from "typeorm";

// export default async function createTypeormConn() {
//   const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
//   return createConnection(connectionOptions);
// }

const connection = {
  async create(){
    await createConnection();
  },

  async close(){
    await getConnection().close(); 
  },

  async clear(){
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    entities.forEach(async (entity) => {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });
  },
};
export default connection;