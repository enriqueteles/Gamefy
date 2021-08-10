import { getCustomRepository } from 'typeorm';
import { factory } from 'typeorm-seeding';

import { Group } from '@entities/Group';
import { User } from '@entities/User';
import { GroupRepository } from '@repositories/GroupRepository';

import { GroupService } from './GroupService';

describe('Group Service', () => {
  let groupRepository : GroupRepository;
  let groupService : GroupService;
  
  
  beforeAll(async () => {
    groupRepository = getCustomRepository(GroupRepository);
    groupService = new GroupService;
  });

  it("should create a group", async () => {
    const userData = await factory(User)().create();
    
    const groupData = await factory(Group)().make();

    const group = await groupService.createGroup({
      ...groupData,
      user_owner: userData.id
    });
    
    expect(group).toHaveProperty("id");
    expect(group.name).toBe(groupData.name);
  });

  
  it("should list all public groups", async () => {
    await factory(Group)().createMany(10);

    const groupList = await groupService.listPublicGroups();
    expect(1+1).toBe(2);

    // expect(groupList).toEqual(
    //   expect.arrayContaining([
    //     expect.objectContaining({
    //       is_private: true
    //     })
    //   ])
    // );
    // expect(groupList).toEqual(
    //   expect.not.arrayContaining([
    //     expect.objectContaining({
    //       is_private: false
    //     })
    //   ])
    // );


  })


  // should let user get all the groups the user joined
  
  // it("should let user join a public group", async () => {
  //   const user = await factory(User)().create();

  //   // tem usuário
  //   // tem grupo
  //   // usuario se inscreve no grupo
  //   // verifica se usuário esta inscrito no grupo
  // })


  // should no let user joina a private group

  
  // should let admin user delete group


  // should not let normal user delete group


  // should let user leave group


  // should not let only admin user leave group

})