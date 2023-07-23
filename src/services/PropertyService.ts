import { FindManyOptions, LessThanOrEqual, Like, MoreThanOrEqual } from 'typeorm';
import { CreateOnePropertyDto, createOnePropertyDto } from '../controllers/dto/CreateOnePropertyDto';
import { FindAllPropertiesDto } from '../controllers/dto/FindAllPropertiesDto';
import { UpdateOnePropertyByIdDto } from '../controllers/dto/UpdateOnePropertyByIdDto';
import AppDataSource from '../dataSource';
import { Property } from '../entities';
import { NotFoundException } from '../shared/exceptions';

export class PropertyService {
  constructor(private readonly propertyRepository = AppDataSource.getRepository(Property)) {}

  async findAll(params?: FindAllPropertiesDto) {
    const where: FindManyOptions<Property>['where'] = {};
    if (params?.address) where.address = Like(`%${params.address}%`);
    if (params?.bathrooms) where.bathrooms = params.bathrooms;
    if (params?.bedrooms) where.bedrooms = params.bedrooms;
    if (params?.priceGte) where.price = MoreThanOrEqual(params.priceGte);
    if (params?.priceLte) where.price = LessThanOrEqual(params.priceLte);

    let skip = 0,
      take = 20;
    if (params?.limit) take = params.limit;
    if (params?.page) skip = (params?.page - 1) * take;

    return this.propertyRepository.find({ where, take, skip });
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
