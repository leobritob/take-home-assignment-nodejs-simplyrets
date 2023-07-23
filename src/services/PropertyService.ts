import { CreateOnePropertyDto, createOnePropertyDto } from '../controllers/dto/CreateOnePropertyDto';
import { UpdateOnePropertyByIdDto } from '../controllers/dto/UpdateOnePropertyByIdDto';
import AppDataSource from '../dataSource';
import { Property } from '../entities';
import { NotFoundException } from '../shared/exceptions';

export class PropertyService {
  constructor(private readonly propertyRepository = AppDataSource.getRepository(Property)) {}

  async findAll() {
    return this.propertyRepository.find();
  }

  async createOne(data: CreateOnePropertyDto) {
    const dto = createOnePropertyDto.parse(data);
    return this.propertyRepository.save(this.propertyRepository.create(dto));
  }

  async findOneByIdOrThrow(id: number) {
    const property = await this.propertyRepository.findOne({ where: { id } });
    if (!property) {
      throw new NotFoundException('Property not found');
    }
    return property;
  }

  async updateOneById(id: number, data: UpdateOnePropertyByIdDto) {
    const property = await this.findOneByIdOrThrow(id);
    this.propertyRepository.merge(property, data);
    return this.propertyRepository.save(property);
  }

  async deleteOneById(id: number) {
    await this.findOneByIdOrThrow(id);
    await this.propertyRepository.delete(id);
  }
}
