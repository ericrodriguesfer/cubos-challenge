import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import { AppError } from '../errors/AppError';

function errorFilter(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  if (error instanceof AppError) {
    return response.status(error.code).json({
      message: error.message,
      status: error.status,
      code: error.code,
    });
  }

  return response.status(500).json({
    message: 'Error intern in server, please try again',
    status: ReasonPhrases.INTERNAL_SERVER_ERROR,
    code: StatusCodes.INTERNAL_SERVER_ERROR,
  });
}

export { errorFilter };
