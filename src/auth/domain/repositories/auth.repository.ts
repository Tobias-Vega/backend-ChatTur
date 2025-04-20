import { User } from "../models/entities/user.entity";

export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface UserRepository {
  save(user: User): Promise<void>
  findByEmail(email: string) : Promise<User | null>
  findById(id: string): Promise<User | null>
}