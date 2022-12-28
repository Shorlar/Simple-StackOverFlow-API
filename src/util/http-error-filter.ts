import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  private readonly logger: Logger;
  constructor() {
    this.logger = new Logger();
  }
  catch(exception: HttpException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
    const errorMessage = exception.message || 'Internal Server Error';

    const errorResponseFormat = {
      statusCode: status,
      errorMessage,
      method: request.method,
      url: request.url,
      time: new Date().toISOString(),
    };

    this.logger.log(
      `Request method: ${request.method}, Request Url: ${
        request.url
      }, Response: ${JSON.stringify(errorResponseFormat)}`,
    );

    response.status(status).json(errorResponseFormat);
  }
}
