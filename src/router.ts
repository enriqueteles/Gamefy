import { Router } from 'express';

import { GroupController } from '@controllers/Groups/GroupController';
import { UserController } from '@controllers/Users/UserController';

import { Auth } from './middleware/Auth';

const router = Router();

const auth = new Auth();

const userController = new UserController();
const groupController = new GroupController();

router.post("/login", userController.login); 
router.post("/users", userController.createUser);

router.get("/users", userController.index); // debug only

router.get("/groups", groupController.listPublicGroups); // list groups
router.post("/groups", auth.authenticate, groupController.createGroup); // create group

export default router;
