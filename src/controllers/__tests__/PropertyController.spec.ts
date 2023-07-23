import seedJson from '../../data/seed.json';
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
    // Arrange
    const req = {} as any;
    const res = {
      json: jest.fn().mockReturnThis(),
    } as any;

    // Act
    await propertyController.findAll(req, res);

    // Assert
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(seedJson);
  });

  it('should be able to create a new property', async () => {
    // Arrange
    const body = {
      id: 127,
      address: '963 Blackwell Street #10',
      price: 850200,
      bedrooms: 1,
      bathrooms: 1,
      type: 'Townhouse',
    };
    const req = { body } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as any;

    // Act
    await propertyController.createOne(req, res);

    // Assert
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(body);
  });

  it('should be able to get one property finding by id', async () => {
    // Arrange
    const id = 1;
    const req = { params: { id } } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as any;

    // Act
    await propertyController.findOneByIdOrThrow(req, res);

    // Assert
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(seedJson[0]);
  });

  it('should be able to throw an error when try to get one property finding by id', async () => {
    // Arrange
    const id = 1e9;
    const req = { params: { id } } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    } as any;

    // Act
    await propertyController.findOneByIdOrThrow(req, res);

    // Assert
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ message: 'Property not found' });
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('should be able to update one property finding by id', async () => {
    // Arrange
    const id = 1;
    const body = { bedrooms: 3 };
    const req = { params: { id }, body } as any;
    const res = {
      json: jest.fn().mockReturnThis(),
    } as any;

    // Act
    await propertyController.updateOneById(req, res);

    // Assert
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith({ ...seedJson[0], bedrooms: body.bedrooms });
  });

  it('should be able to delete one property finding by id', async () => {
    // Arrange
    const id = 1;
    const req = { params: { id } } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      end: jest.fn().mockReturnThis(),
    } as any;

    // Act
    await propertyController.deleteOneById(req, res);

    // Assert
    expect(res.end).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(204);
  });
});
