import * as Faker from 'faker';
import { define } from 'typeorm-seeding';

import { Group } from '../entities/Group';

define(Group, (faker: typeof Faker) =>  {
  const group = new Group()

  group.name = faker.name.title();
  group.is_private = faker.datatype.boolean();

  return group;
})