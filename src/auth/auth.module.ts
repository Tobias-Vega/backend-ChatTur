import { Module } from '@nestjs/common';
import { AuthService } from './infrastructure/services/auth.service';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { UserOrmEntity } from './infrastructure/database/typeorm/user.orm-entity';
import { LoginUserUseCase, RegisterUserUseCase } from './application/use-cases';
import { TypeOrmUserRepository } from './infrastructure/database/typeorm/user.infraestructure-repository';
import { MongooseUserRepository } from './infrastructure/database/mongoose/user.repository';
import { UserSchema } from './infrastructure/database/mongoose/user.schema';
import { UserRepositoryProvider } from './infrastructure/repositories/user-repository.provider';
import { UUIDGeneratorAdapter, BcryptAdapter } from './infrastructure/adapters';
import { UserRepository } from './domain/repositories/auth.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserOrmEntity]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    TypeOrmUserRepository,
    MongooseUserRepository,
    UUIDGeneratorAdapter,
    BcryptAdapter,
    UserRepositoryProvider,
    {
      provide: RegisterUserUseCase,
      useFactory: (
        repo: UserRepository,
        uuid: UUIDGeneratorAdapter,
        encrypter: BcryptAdapter
      ) => new RegisterUserUseCase(repo, uuid, encrypter),
      inject: ['USER_REPOSITORY', UUIDGeneratorAdapter, BcryptAdapter],
    },
    {
      provide: LoginUserUseCase,
      useFactory: (repo: UserRepository, encrypter: BcryptAdapter) =>
        new LoginUserUseCase(repo, encrypter),
      inject: ['USER_REPOSITORY', BcryptAdapter],
    },
  ],
})
export class AuthModule {}
