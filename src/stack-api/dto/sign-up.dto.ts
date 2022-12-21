import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsAlphanumeric,
  Length,
  IsOptional,
  IsDefined,
} from 'class-validator';
import { User } from '../entities';
import { IsValueExists } from '../shared';

export class SignUpDto {
  /**
   * User's display name
   * @example amazingUser12
   */
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @IsValueExists()
  displayName: string;

  /**
   * user's email address
   * @example amazingUser@gmail.com
   */
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @IsValueExists()
  email: string;

  /**
   * User's password. Must be a combination of letters and numbers.Must not be less than 8
   * @example 1234testyu
   */
  @IsNotEmpty()
  @IsString()
  @IsAlphanumeric()
  @Length(8)
  password: string;

  /**
   * User's profile summary
   * @example I am software developer
   */
  @IsString()
  @IsOptional()
  aboutMe: string;
}
