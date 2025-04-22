import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { MongooseUserRepository } from './user.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
  ],
  providers: [MongooseUserRepository],
  exports: [MongooseUserRepository]
})
export class UserMongooseModule {}
