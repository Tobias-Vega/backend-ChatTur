import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DomainExceptionFilter } from './auth/infrastructure/filters/domain-exception.filter';
import { EmailAlreadyExistsExceptionFilter } from './auth/infrastructure/filters/email-exists.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  )

  app.useGlobalFilters(
    new DomainExceptionFilter(),
    new EmailAlreadyExistsExceptionFilter()
  )

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
