import SessionController from '@controllers/SessionController';
import { UserController } from '@controllers/UserController';
import { Router } from 'express';

const router = Router();

const sessionController = new SessionController();
const userController = new UserController();

router.post("/sessions", sessionController.store);

router.post("/users", userController.createUser);

export default router;
