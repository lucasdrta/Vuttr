import { Request, Response } from 'express';
import { Tool } from '../models/tools';

export class ToolsController {
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const tool = await Tool.create(req.body);
      res.status(201).send(tool);
    } catch (error) {
      res.status(400).send({
        code: 400,
        message: error.message,
      });
    }
  }
}
