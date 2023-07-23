import 'express-async-errors';
import express from 'express';
import { propertyRoutes } from './routes';
import { handleRequestErrors } from './shared/validations';

const app = express();
app.use(express.json());
app.use('/properties', propertyRoutes);
app.use(handleRequestErrors);

export default app;
