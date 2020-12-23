import { Router } from 'express';
import tools from './tools';

const routes = Router();

routes.use('/tools', tools);

export default routes;
