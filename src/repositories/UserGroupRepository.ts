import { EntityRepository, Repository } from 'typeorm';

import { UserGroup } from '@entities/UserGroup';

@EntityRepository(UserGroup)
export class UserGroupRepository extends Repository<UserGroup> {
  
}