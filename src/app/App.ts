import { errors } from 'celebrate';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import 'express-async-errors';

import { routes } from '../routes';
import { errorFilter } from '../middlewares/errorFilter';

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());
app.use(errorFilter);

export { app };
