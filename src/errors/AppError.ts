import { ReasonPhrases, StatusCodes } from 'http-status-codes';

class AppError extends Error {
  public readonly status: ReasonPhrases;
  public readonly code: StatusCodes;

  constructor(
    message: string,
    status: ReasonPhrases = ReasonPhrases.BAD_REQUEST,
    code: StatusCodes = StatusCodes.BAD_REQUEST,
  ) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

export { AppError };
