import { Router } from 'express';
import { UserController } from '../controllers/user';

const routes = Router();
const userController = new UserController();

routes.post('/', userController.create);
routes.post('/authenticate', userController.authenticate);

export default routes;
