import { User } from "src/auth/domain/models/entities/user.entity";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('user')
export class UserOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string

  @Column()
  password: string

    static fromDomain(user: User): UserOrmEntity {
    const entity = new UserOrmEntity();

    entity.id = user.getId(),
    entity.name = user.getName(),
    entity.email = user.getEmail(),
    entity.password = user.getPassword()
    return entity;
  }

  toDomain(): User {
    return new User({
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
    });
  }
}