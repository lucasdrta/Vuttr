import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth';
import tools from './tools';
import users from './users';

const routes = Router();

routes.use('/tools', authMiddleware, tools);
routes.use('/users', users);

export default routes;
