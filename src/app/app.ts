import { errors } from 'celebrate';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import routes from '../routes';

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

export default app;
