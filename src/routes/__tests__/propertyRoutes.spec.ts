import request from 'supertest';
import app from '../../app';
import AppDataSource, { seedDb } from '../../dataSource';
import seedJson from '../../data/seed.json';
import { CreateOnePropertyDto } from '../../controllers/dto/CreateOnePropertyDto';
import { PropertyType } from '../../entities';
import { UpdateOnePropertyByIdDto } from '../../controllers/dto/UpdateOnePropertyByIdDto';

describe('propertyRoutes', () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
    await seedDb();
  });

  describe('GET /properties', () => {
    it('should be able to get all properties', async () => {
      const response = await request(app).get('/properties');
      expect(response.body).toEqual(seedJson);
    });
  });

  describe('GET /properties/:id', () => {
    it('should be able to get one property finding by id', async () => {
      const id = 1;
      const response = await request(app).get(`/properties/${id}`);
      expect(response.body).toEqual(seedJson[0]);
    });

    it('should be able to throw an error when try to get one property finding by id', async () => {
      const id = 1e9;
      request(app)
        .get(`/properties/${id}`)
        .expect(404)
        .end((err) => {
          if (err) expect(err).toEqual({ message: 'Property not found' });
        });
    });
  });

  describe('POST /properties', () => {
    it('should be able to create a new property', async () => {
      const body: CreateOnePropertyDto = {
        address: '963 Blackwell Street #10',
        price: 850200,
        bedrooms: 1,
        bathrooms: 1,
        type: PropertyType.TOWNHOUSE,
      };
      const response = await request(app).post('/properties').send(body);
      expect(response.status).toEqual(201);
      expect(response.body.id).toEqual(expect.any(Number));
    });

    it('should be able to throw an error when try to create a new property with wrong fields', async () => {
      const body: CreateOnePropertyDto = {
        address: '963 Blackwell Street #10',
        price: -1,
        bedrooms: -1,
        bathrooms: -1,
        type: PropertyType.TOWNHOUSE,
      };
      const response = await request(app).post('/properties').send(body);
      expect(response.status).toEqual(400);
    });
  });

  describe('PUT /properties/:id', () => {
    it('should be able to update one property finding by id', async () => {
      const id = 1;
      const body: UpdateOnePropertyByIdDto = {
        address: '963 Blackwell Street #10',
        price: 850200,
        bedrooms: 10,
        bathrooms: 1,
        type: PropertyType.TOWNHOUSE,
      };
      const response = await request(app).put(`/properties/${id}`).send(body);
      expect(response.body).toBeDefined();
      expect(response.body.bedrooms).toEqual(body.bedrooms);
    });

    it('should be able to throw an error when try to update property finding by id', (done) => {
      const id = 1e9;
      const body: UpdateOnePropertyByIdDto = {
        address: '963 Blackwell Street #10',
        price: 850200,
        bedrooms: 10,
        bathrooms: 1,
        type: PropertyType.TOWNHOUSE,
      };
      request(app)
        .put(`/properties/${id}`)
        .send(body)
        .expect(404)
        .end((err) => {
          if (err) expect(err).toEqual({ message: 'Property not found' });
          done();
        });
    });
  });

  describe('DELETE /properties/:id', () => {
    it('should be able to delete one property finding by id', () => {
      const id = 1;
      return request(app).delete(`/properties/${id}`).expect(204);
    });

    it('should be able to throw an error when try to delete one property finding by id', (done) => {
      const id = 1e9;
      request(app)
        .delete(`/properties/${id}`)
        .expect(404)
        .end((err) => {
          if (err) expect(err).toEqual({ message: 'Property not found' });
          done();
        });
    });
  });
});
