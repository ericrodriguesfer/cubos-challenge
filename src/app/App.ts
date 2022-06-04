import { errors } from 'celebrate';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, NextFunction, Request } from 'express';
import 'express-async-errors';
import AppError from '../errors/AppError';
import routes from '../routes';

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.code).json({
        message: error.message,
        status: error.status,
        code: error.code,
      });
    }

    return response.status(500).json({
      message: 'Error intern in server, please try again',
      status: 'Internal Server Error',
      code: 500,
    });
  },
);

export default app;
