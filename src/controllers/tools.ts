import { Request, Response } from 'express';
import { Tool } from '../models/tools';

export class ToolsController {
  public async list(req: Request, res: Response): Promise<void> {
    try {
      const tags = req.query;

      if (!tags) {
        const tools = await Tool.find();
        res.status(200).send(tools);
      }

      const tools = await Tool.find(tags);
      res.status(200).send(tools);
    } catch (error) {
      res.status(400).send({
        code: 400,
        message: error.message,
      });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const tool = new Tool(req.body);
      const result = await tool.save();
      res.status(201).send(result);
    } catch (error) {
      res.status(400).send({
        code: 400,
        message: error.message,
      });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await Tool.findByIdAndRemove(id);

      res.status(200).send();
    } catch (error) {
      res.status(400).send({
        code: 400,
        message: error.message,
      });
    }
  }
}
