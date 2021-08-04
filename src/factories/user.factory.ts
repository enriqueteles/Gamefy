import * as Faker from 'faker';
import { define } from 'typeorm-seeding';

import { User } from '../entities/User';

define(User, (faker: typeof Faker) =>  {
  const user = new User()

  user.name = faker.name.findName();
  user.email = faker.internet.email();
  user.username = faker.internet.userName();
  user.password = faker.internet.password();
  user.image_medium_url = faker.image.imageUrl();
  user.is_super = false;

  return user;
})
