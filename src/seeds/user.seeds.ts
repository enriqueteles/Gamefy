import { Connection, createConnection, getConnection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

import { User } from '../entities/User';

export class CreateUsers implements Seeder {

  public async run(factory: Factory, connection: Connection): Promise<any> {
    await factory(User)().createMany(10);
  }
}
