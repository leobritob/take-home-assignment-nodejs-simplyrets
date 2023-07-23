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
    return res.json(item);
  }

  async findOneByIdOrThrow(req: Request, res: Response) {
    const id = Number(req.params.id);
    const item = await this.propertyService.findOneByIdOrThrow(id);
    return res.json(item);
  }

  async updateOneById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const item = await this.propertyService.updateOneById(id, req.body);
    return res.json(item);
  }

  async deleteOneById(req: Request, res: Response) {
    const id = Number(req.params.id);
    await this.propertyService.deleteOneById(id);
    return res.end();
  }
}
