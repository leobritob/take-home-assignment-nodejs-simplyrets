import { Request, Response } from 'express';
import { PropertyService } from '../services';
import { IsIncrementalId } from '../shared/validations';
import { createOnePropertyDto } from './dto/CreateOnePropertyDto';
import { updateOnePropertyByIdDto } from './dto/UpdateOnePropertyByIdDto';
import { findAllPropertiesDto } from './dto/FindAllPropertiesDto';

export class PropertyController {
  constructor(private readonly propertyService = new PropertyService()) {}

  async findAll(req: Request, res: Response) {
    const dto = findAllPropertiesDto.parse(req.query);
    const list = await this.propertyService.findAll(dto);
    res.json(list);
  }

  async createOne(req: Request, res: Response) {
    const dto = createOnePropertyDto.parse(req.body);
    const item = await this.propertyService.createOne(dto);
    res.status(201).json(item);
  }

  async findOneByIdOrThrow(req: Request, res: Response) {
    const id = IsIncrementalId(req.params.id);
    const item = await this.propertyService.findOneByIdOrThrow(id);
    res.json(item);
  }

  async updateOneById(req: Request, res: Response) {
    const id = IsIncrementalId(req.params.id);
    const dto = updateOnePropertyByIdDto.parse(req.body);
    const item = await this.propertyService.updateOneById(id, dto);
    res.json(item);
  }

  async deleteOneById(req: Request, res: Response) {
    const id = IsIncrementalId(req.params.id);
    await this.propertyService.deleteOneById(id);
    res.status(204).end();
  }
}
