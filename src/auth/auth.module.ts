import { Module } from '@nestjs/common';
import { AuthService } from './infrastructure/services/auth.service';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from './infrastructure/database/typeorm/user.orm-entity';
import { LoginUserUseCase, RegisterUserUseCase } from './application/use-cases';
import { TypeOrmUserRepository } from './infrastructure/repositories/user.infraestructure-repository';
import { UUIDGenerator } from './domain/ports';
import { UUIDGeneratorAdapter, BcryptAdapter } from './infrastructure/adapters';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserOrmEntity])
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    TypeOrmUserRepository,
    UUIDGeneratorAdapter,
    BcryptAdapter,
    {
      provide: RegisterUserUseCase,
      useFactory: (
        repo: TypeOrmUserRepository,
        uuid: UUIDGenerator,
        encrypter: BcryptAdapter
      ) => new RegisterUserUseCase(repo, uuid, encrypter),
      inject: [TypeOrmUserRepository, UUIDGeneratorAdapter, BcryptAdapter],
    },
    {
      provide: LoginUserUseCase,
      useFactory: (repo: TypeOrmUserRepository, encrypter: BcryptAdapter) =>
        new LoginUserUseCase(repo, encrypter),
      inject: [TypeOrmUserRepository, BcryptAdapter],
    },
  ],
})
export class AuthModule {}
