import { EntityRepository, Repository } from 'typeorm';

import { Group } from '@entities/Group';

@EntityRepository(Group)
export class GroupRepository extends Repository<Group> {

}