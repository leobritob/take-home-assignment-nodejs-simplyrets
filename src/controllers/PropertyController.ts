import { PropertyService } from '../services';

export class PropertyController {
  constructor(private readonly propertyService = new PropertyService()) {}

  async findAll() {
    return this.propertyService.findAll();
  }

  async createOne(data: any) {
    return this.propertyService.createOne(data);
  }

  async findOneByIdOrThrow(id: number) {
    return this.propertyService.findOneByIdOrThrow(id);
  }

  async updateOneById(id: number, data: any) {
    return this.propertyService.updateOneById(id, data);
  }

  async deleteOneById(id: number) {
    return this.propertyService.deleteOneById(id);
  }
}
