import { Injectable } from '@nestjs/common';
import { LoginUserDto, RegisterUserDto } from 'src/auth/infrastructure/controllers/dto';
import { LoginUserUseCase, RegisterUserUseCase } from 'src/auth/application/use-cases';

@Injectable()
export class AuthService {
  constructor(
    private readonly registerUserCase: RegisterUserUseCase,
    private readonly loginUserCase: LoginUserUseCase
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    return this.registerUserCase.execute(registerUserDto)
  }

  async login(loginUserDto: LoginUserDto) {
    return this.loginUserCase.execute(loginUserDto)
  }
}
