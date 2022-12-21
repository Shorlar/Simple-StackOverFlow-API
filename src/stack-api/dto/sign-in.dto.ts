import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  /**
   * User's email used at sign up
   * @example testemail@gmail.com
   */
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /**
   * User's password
   * @example 12345test
   */
  @IsString()
  @IsNotEmpty()
  password: string;
}
