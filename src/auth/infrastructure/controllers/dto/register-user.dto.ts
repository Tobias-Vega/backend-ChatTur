import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";


export class RegisterUserDto {
  
  @IsString()
  @MinLength(3, { message: 'El nombre como mínimo debe tener 3 caracteres' })
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6, { message: 'La contraseña debe tener como minimo 6 caracteres' })
  @MaxLength(30, { message: 'La contraseña es muy larga' })
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'La contraseña debe tener letras en mayuscula, minuscula y un número'
  })
  password: string;
}
