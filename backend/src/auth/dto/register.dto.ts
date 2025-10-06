import { IsString, IsEmail, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString({ message: 'Le nom doit être une chaîne de caractères' })
  name: string;

  @IsEmail({}, { message: 'Email invalide' })
  email: string;

  @MinLength(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' })
  password: string;
}
