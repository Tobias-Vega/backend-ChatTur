import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { EmailAlreadyExistsException } from 'src/auth/domain/errors/email-exist.execption';

@Catch(EmailAlreadyExistsException)
export class EmailAlreadyExistsExceptionFilter implements ExceptionFilter {
  catch(exception: EmailAlreadyExistsException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const status = HttpStatus.CONFLICT;

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      error: 'Conflict',
    });
  }
}
