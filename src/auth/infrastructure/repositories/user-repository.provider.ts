import { Provider } from '@nestjs/common';
import { UserRepository } from 'src/auth/domain/repositories/auth.repository';
import { TypeOrmUserRepository } from '../database/typeorm/user.infraestructure-repository';
import { MongooseUserRepository } from '../database/mongoose/user.repository';

export const UserRepositoryProvider: Provider = {
  provide: 'USER_REPOSITORY',
  useFactory: (
    typeOrmRepo: TypeOrmUserRepository,
    mongoRepo: MongooseUserRepository
  ): UserRepository => {
    const useMongo = process.env.USE_MONGO === 'true';
    return useMongo ? mongoRepo : typeOrmRepo;
  },
  inject: [TypeOrmUserRepository, MongooseUserRepository],
};
