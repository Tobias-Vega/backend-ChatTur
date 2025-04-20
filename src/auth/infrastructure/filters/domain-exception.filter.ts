import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { InvalidCredentialsException } from 'src/auth/domain/errors/invalid-credenitials.execption';
import { HttpStatus } from '@nestjs/common';

@Catch(InvalidCredentialsException)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: InvalidCredentialsException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const status = HttpStatus.UNAUTHORIZED;
    
    response.status(status).json({
      statusCode: status,
      message: exception.message,
      error: 'Unauthorized',
    });
  }
}