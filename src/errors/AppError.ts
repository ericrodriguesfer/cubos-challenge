class AppError {
  public readonly message: string;
  public readonly status: string;
  public readonly code: number;

  constructor(
    message: string,
    status: string = 'Bad Request',
    code: number = 400,
  ) {
    this.message = message;
    this.status = status;
    this.code = code;
  }
}

export default AppError;
