import { Router } from 'express';
import tools from './tools';
import users from './users';

const routes = Router();

routes.use('/tools', tools);
routes.use('/users', users);

export default routes;
