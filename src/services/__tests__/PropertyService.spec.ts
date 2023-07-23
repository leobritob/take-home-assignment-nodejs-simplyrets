import { CreateOnePropertyDto } from '../../controllers/dto/CreateOnePropertyDto';
import { UpdateOnePropertyByIdDto } from '../../controllers/dto/UpdateOnePropertyByIdDto';
import AppDataSource, { seedDb } from '../../dataSource';
import { PropertyType } from '../../entities';
import { PropertyService } from '../PropertyService';

describe('PropertyService', () => {
  let propertyService: PropertyService;

  beforeAll(async () => {
    await AppDataSource.initialize();
    await seedDb();
  });

  beforeEach(() => {
    propertyService = new PropertyService();
  });

  it('should be able to get all properties', async () => {
    // Act
    const list = await propertyService.findAll();
    // Asert
    expect(list).toBeDefined();
    expect(list.length).toBeGreaterThanOrEqual(1);
  });

  it('should be able to create a new property', async () => {
    // Arrange
    const data: CreateOnePropertyDto = {
      address: '963 Blackwell Street #10',
      price: 850200,
      bedrooms: 1,
      bathrooms: 1,
      type: PropertyType.TOWNHOUSE,
    };
    // Act
    const item = await propertyService.createOne(data);
    // Asert
    expect(item).toBeDefined();
  });

  it('should be able to get one property finding by id', async () => {
    // Arrange
    const id = 1;
    // Act
    const item = await propertyService.findOneByIdOrThrow(id);
    // Asert
    expect(item).toBeDefined();
  });

  it('should be able to throw an error when try to get one property finding by id', async () => {
    // Arrange
    const id = 1e9;
    // Asert
    expect(propertyService.findOneByIdOrThrow(id)).rejects.toThrowError(new Error('Property not found'));
  });

  it('should be able to update one property finding by id', async () => {
    // Arrange
    const id = 1;
    const data: UpdateOnePropertyByIdDto = {
      address: '963 Blackwell Street #10',
      price: 850200,
      bedrooms: 10,
      bathrooms: 1,
      type: PropertyType.TOWNHOUSE,
    };
    // Act
    const item = await propertyService.updateOneById(id, data);
    // Asert
    expect(item).toBeDefined();
    expect(item.bedrooms).toEqual(data.bedrooms);
  });

  it('should be able to delete one property finding by id', async () => {
    // Arrange
    const id = 1;
    // Act
    await propertyService.deleteOneById(id);
    // Asert
    expect(propertyService.findOneByIdOrThrow(id)).rejects.toThrowError(new Error('Property not found'));
  });

  it('should be able to throw an error when try to get one property finding by id', async () => {
    // Arrange
    const id = 1e9;
    // Asert
    expect(propertyService.deleteOneById(id)).rejects.toThrowError(new Error('Property not found'));
  });
});
