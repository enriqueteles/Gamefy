import { Request, Response } from 'express';

import { GroupService } from '../../services/Group/GroupService';
import { IRequestToken } from '../IRequestToken';

const groupService = new GroupService();

export class GroupController {
  // list all public groups
  async listPublicGroups(request: Request, response: Response) {
    const groups = await groupService.listPublicGroups();
    return response.json(groups);
  }

  // list all groups the user has joined or is admin
  async listUserGroups(request: IRequestToken, response: Response) {
    const user_id = request.user_id;
    
    const groups = await groupService.listUserGroups({
      user_id
    });

    return response.json(groups);
  }

  // user create group
  async createGroup(request: IRequestToken, response: Response) {
    const {
      name,
      is_private
    } = request.body;

    const group = await groupService.createGroup({
      name,
      is_private,
      user_owner: request.user_id
    });

    return response.json(group);
  }


  // user delete group
  async deleteGroup(request: IRequestToken, response: Response) {
    const { group_id } = request.params;
    const user_id = request.user_id;

    
    const deleted = await groupService.deleteGroup({
      user_id,
      group_id
    });

    if(!deleted) 
      throw new Error("Couldn't delete group")
    
    return response.json({
      message: "Group deleted"
    });
  }

  // user join existing group
  async joinGroup(request: IRequestToken, response: Response) {
    const { group_id } = request.params;
    const user_id = request.user_id;

    const joined = await groupService.joinGroup({
      user_id,
      group_id
    });

    if(!joined)
      throw new Error("Couldn't join group");

    return response.json({
      message: "User joined group"
    });
  }

  // user leave existing group
  async leaveGroup(request: IRequestToken, response: Response) {
    const { group_id } = request.params;
    const user_id = request.user_id;

    const left = await groupService.leaveGroup({
      user_id,
      group_id
    });

    if(!left)
      throw new Error("Couldn't leave group");

    return response.json({
      message: "User left group"
    });
  }

  
}