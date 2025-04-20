import { UserRepository } from "src/auth/domain/repositories/auth.repository";
import { User } from "src/auth/domain/models/entities/user.entity";
import { loginInput } from "../interfaces";
import { Encrypter } from "src/auth/domain/ports";
import { InvalidCredentialsException } from "src/auth/domain/errors/invalid-credenitials.execption";

export class LoginUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly encrypter: Encrypter,
  ) {}

  async execute(loginInput: loginInput): Promise<User> {
    const user = await this.userRepository.findByEmail(loginInput.email);

    if (!user) {
      throw new InvalidCredentialsException();
    }

    const isPasswordValid = await this.encrypter.compare(loginInput.password, user.getPassword());

    if (!isPasswordValid) {
      throw new InvalidCredentialsException();
    }

    return user;
  }
}