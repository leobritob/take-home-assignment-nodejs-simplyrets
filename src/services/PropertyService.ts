import AppDataSource from '../dataSource';
import { Property } from '../entities';

export class PropertyService {
  constructor(private readonly propertyRepository = AppDataSource.getRepository(Property)) {}

  async findAll() {
    return this.propertyRepository.find();
  }

  async createOne(data: any) {
    return this.propertyRepository.save(this.propertyRepository.create(data));
  }

  async findOneByIdOrThrow(id: number) {
    const property = await this.propertyRepository.findOne({ where: { id } });
    if (!property) {
      throw new Error('Property not found');
    }
    return property;
  }

  async updateOneById(id: number, data: any) {
    const property = await this.findOneByIdOrThrow(id);
    this.propertyRepository.merge(property, data);
    return this.propertyRepository.save(property);
  }

  async deleteOneById(id: number) {
    await this.propertyRepository.delete(id);
  }
}
