import { json } from 'express';
import { getCustomRepository } from 'typeorm';

import { UserGroup } from '@entities/UserGroup';

import { GroupRepository } from '../../repositories/GroupRepository';
import { UserGroupRepository } from '../../repositories/UserGroupRepository';
import { UserRepository } from '../../repositories/UserRepository';
import { ICreateGroupReq } from './ICreateGroupReq';
import { IDeleteGroupReq } from './IDeleteGroupReq';

export class GroupService {
  
  // list all public groups
  async listPublicGroups() {
    const groupRepository = getCustomRepository(GroupRepository);
    
    const groups = await groupRepository.find({
      is_private: false
    });

    return groups;
  }

  // list all groups the user has joined or is admin
  async listUserGroups({
    user_id
  }) {
    const userRepository = getCustomRepository(UserRepository);
    const groupRepository = getCustomRepository(GroupRepository);
    const userGroupRepository = getCustomRepository(UserGroupRepository);
    
    const groups = await userGroupRepository.createQueryBuilder('userGroup')
      .where("user_id = :user_id", { user_id })
      .select(['userGroup.is_admin', 'group.name' as 'name', 'group.id'])
      .leftJoin('userGroup.group', 'group')
      .getMany();
    // const groups = await userGroupRepository.find({
    //   relations: ['group'],
    //   where: {
    //     user_id
    //   }
    // });

    return groups;
  }

  // user create group
  async createGroup({
    name,
    is_private,
    user_owner
  } : ICreateGroupReq ) {
    const userRepository = getCustomRepository(UserRepository);
    const groupRepository = getCustomRepository(GroupRepository);

    const userGroupRepository = getCustomRepository(UserGroupRepository);

    // validate input
    if(!name)
      throw new Error("Name missing");
    if(is_private == undefined)
      throw new Error("Must specify if group is public or private");
    if(!user_owner)
      throw new Error("User information for creating group is missing");

    // validate user
    const user = await userRepository.findOne({
      id: user_owner
    });

    if(!user)
      throw new Error("Can't find user");

    // create group
    const group = await groupRepository.create({
      name,
      is_private
    });
    await groupRepository.save(group);

    // create userGroup relation
    const userGroup = new UserGroup(true, user, group);
    await userGroupRepository.save(userGroup);

    return group;
  }


  // user delete group
  async deleteGroup({
    user_id,
    group_id
  } : IDeleteGroupReq ) {
    const userRepository = getCustomRepository(UserRepository);
    const groupRepository = getCustomRepository(GroupRepository);
    const userGroupRepository = getCustomRepository(UserGroupRepository);

    // verify user
    const user = await userRepository.findOne({
      id: user_id
    });

    if(!user)
      throw new Error("User not found");

    // verify group
    const group = await groupRepository.findOne({
      id: group_id
    });

    if(!group)
      throw new Error("Group not found");

    // verify userGroup relation is admin
    const userGroup = await userGroupRepository.findOne({
      user_id,
      group_id
    });

    if(!userGroup)
      throw new Error("User is not in the group passed");
    if(userGroup.is_admin == false)
      throw new Error("User is not group admin");

    // delete
    const deleted = await groupRepository.delete({
      id: group_id
    });

    console.log(deleted);
    return true;


  }

  // user join existing group
  async joinGroup({
    user_id,
    group_id
  }) {
    const userRepository = getCustomRepository(UserRepository);
    const groupRepository = getCustomRepository(GroupRepository);
    const userGroupRepository = getCustomRepository(UserGroupRepository);

    // validate user
    const user = await userRepository.findOne({
      id: user_id
    });

    if(!user)
      throw new Error("User not found");

    // validate group
    const group = await groupRepository.findOne({
      id: group_id
    });

    if(!group)
      throw new Error("Group not found");
    
    // validate user group relation
    const userGroupAlreadyJoined = await userGroupRepository.findOne({
      user_id,
      group_id
    });

    if(userGroupAlreadyJoined)
      throw new Error("User already joined the group");
      
    // join
    const userGroup = new UserGroup(false, user, group);
    const joined = await userGroupRepository.save(userGroup);

    return joined;
  }


  // user leave existing group
  async leaveGroup({
    user_id,
    group_id
  }) {
    const userRepository = getCustomRepository(UserRepository);
    const groupRepository = getCustomRepository(GroupRepository);
    const userGroupRepository = getCustomRepository(UserGroupRepository);

    // validate user
    const user = await userRepository.findOne({
      id: user_id
    });

    if(!user)
      throw new Error("User not found");

    // validate group
    const group = await groupRepository.findOne({
      id: group_id
    });

    if(!group)
      throw new Error("Group not found");
    
    // validate user group relation
    const userGroupExists = await userGroupRepository.findOne({
      user_id,
      group_id
    });

    if(!userGroupExists)
      throw new Error("User is not in group");
      
    // leave
    const left = await userGroupRepository.delete({
      user_id,
      group_id
    });

    return left;
  }
}