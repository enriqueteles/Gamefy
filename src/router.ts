import { Router } from 'express';

import { UserController } from '@controllers/Users/UserController';

const router = Router();

const userController = new UserController();

router.post("/login", userController.login); 

router.get("/users", userController.index); // debug only
router.post("/users", userController.createUser);



export default router;
