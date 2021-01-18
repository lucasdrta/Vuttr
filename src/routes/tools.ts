import { Router } from 'express';
import { ToolsController } from '../controllers/tools';

const routes = Router();
const toolsController = new ToolsController();

routes.get('/', toolsController.list);
routes.post('/', toolsController.create);
routes.delete('/:id', toolsController.delete);

export default routes;
