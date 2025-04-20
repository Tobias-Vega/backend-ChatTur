import { User } from "src/auth/domain/models/entities/user.entity";
import { UserRepository } from "src/auth/domain/repositories/auth.repository";
import { RegisterInput } from "../interfaces";
import { UUIDGenerator, Encrypter } from "src/auth/domain/ports";
import { EmailAlreadyExistsException } from "src/auth/domain/errors/email-exist.execption";

export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly uuidGenerator: UUIDGenerator,
    private readonly encrypter: Encrypter
  ) {}

  async execute(registerInput: RegisterInput): Promise<User> {

    const existingEmail = await this.userRepository.findByEmail(registerInput.email);

    if (existingEmail) {
      throw new EmailAlreadyExistsException();
    }

    const hashedPassword = await this.encrypter.hash(registerInput.password)

    const user = new User({
      id: this.uuidGenerator.generate(),
      name: registerInput.name,
      email: registerInput.email,
      password: hashedPassword,
    });


    await this.userRepository.save(user);
    return user;
  }
}