import { Request, Response } from 'express';
import { PropertyService } from '../services';

export class PropertyController {
  constructor(private readonly propertyService = new PropertyService()) {}

  async findAll(req: Request, res: Response) {
    const list = await this.propertyService.findAll();
    return res.json(list);
  }

  async createOne(req: Request, res: Response) {
    const item = await this.propertyService.createOne(req.body);
    return res.status(201).json(item);
  }

  async findOneByIdOrThrow(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const item = await this.propertyService.findOneByIdOrThrow(id);
      return res.json(item);
    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }
  }

  async updateOneById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const item = await this.propertyService.updateOneById(id, req.body);
      return res.json(item);
    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }
  }

  async deleteOneById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await this.propertyService.deleteOneById(id);
      return res.status(204).end();
    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }
  }
}
