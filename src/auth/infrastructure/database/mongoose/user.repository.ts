import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRepository } from 'src/auth/domain/repositories/auth.repository';
import { User } from 'src/auth/domain/models/entities/user.entity';
import { UserDocument } from './user.document';

@Injectable()
export class MongooseUserRepository implements UserRepository {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async save(user: User): Promise<void> {
    await this.userModel.create({
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      password: user.getPassword(),
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const doc = await this.userModel.findOne({ email }).lean();
    return doc ? new User(doc) : null;
  }

  async findById(id: string): Promise<User | null> {
    const doc = await this.userModel.findOne({ id }).lean();
    return doc ? new User(doc) : null;
  }
}
