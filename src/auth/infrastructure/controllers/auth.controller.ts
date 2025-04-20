import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginUserDto, RegisterUserDto } from 'src/auth/infrastructure/controllers/dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {

    await this.authService.register(registerUserDto)

    return { message: "Usuario registrado exitosamente" }
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    
    const user = await this.authService.login(loginUserDto);

    return {
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
    }
  }
}
