import AppDataSource, { seedDb } from '../../dataSource';
import { PropertyController } from '../PropertyController';

describe('PropertyController', () => {
  let propertyController: PropertyController;

  beforeAll(async () => {
    await AppDataSource.initialize();
    await seedDb();
  });

  beforeEach(() => {
    propertyController = new PropertyController();
  });

  it('should be able to get all properties', async () => {
    // Act
    const list = await propertyController.findAll();
    // Asert
    expect(list).toBeDefined();
    expect(list.length).toBeGreaterThanOrEqual(1);
  });

  it('should be able to create a new property', async () => {
    // Arrange
    const data = {
      id: 127,
      address: '963 Blackwell Street #10',
      price: 850200,
      bedrooms: 1,
      bathrooms: 1,
      type: 'Townhouse',
    };
    // Act
    const item = await propertyController.createOne(data);
    // Asert
    expect(item).toBeDefined();
  });

  it('should be able to get one property finding by id', async () => {
    // Arrange
    const id = 1;
    // Act
    const item = await propertyController.findOneByIdOrThrow(id);
    // Asert
    expect(item).toBeDefined();
  });

  it('should be able to throw an error when try to get one property finding by id', async () => {
    // Arrange
    const id = 1e9;
    // Asert
    expect(propertyController.findOneByIdOrThrow(id)).rejects.toThrowError(new Error('Property not found'));
  });

  it('should be able to update one property finding by id', async () => {
    // Arrange
    const id = 1;
    const data = { bedrooms: 3 };
    // Act
    const item = await propertyController.updateOneById(id, data);
    // Asert
    expect(item).toBeDefined();
    expect(item.bedrooms).toEqual(data.bedrooms);
  });

  it('should be able to delete one property finding by id', async () => {
    // Arrange
    const id = 1;
    // Act
    await propertyController.deleteOneById(id);
    // Asert
    expect(propertyController.findOneByIdOrThrow(id)).rejects.toThrowError(new Error('Property not found'));
  });
});
