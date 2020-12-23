import { Router } from 'express';
import { ToolsController } from '../controllers/tools';

const routes = Router();
const toolsController = new ToolsController();

routes.post('/', toolsController.create);

export default routes;
