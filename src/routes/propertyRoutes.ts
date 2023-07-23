import express from 'express';
import bodyParser from 'body-parser';
import { PropertyController } from '../controllers';

const propertyController = new PropertyController();

export const propertyRoutes = express.Router();

propertyRoutes.use(bodyParser.json());

propertyRoutes.get('/', propertyController.findAll.bind(propertyController));

propertyRoutes.get('/:id', propertyController.findOneByIdOrThrow.bind(propertyController));

propertyRoutes.post('/', propertyController.createOne.bind(propertyController));

propertyRoutes.put('/:id', propertyController.updateOneById.bind(propertyController));

propertyRoutes.delete('/:id', propertyController.deleteOneById.bind(propertyController));
