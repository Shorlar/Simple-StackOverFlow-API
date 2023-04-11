import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SignUpCommand } from './sign-up.command';
import { Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities';
import * as bcrypt from 'bcryptjs';
import { ErrorMessages } from '../../shared';
import { JwtService } from '@nestjs/jwt';
import { DatabaseException } from '../../../util/database-exception';

@CommandHandler(SignUpCommand)
export class SignUpCommandHandler implements ICommandHandler<SignUpCommand> {
  private readonly logger: Logger;
  constructor(
    @InjectRepository(User) private repository: Repository<User>,
    private jwtService: JwtService,
  ) {
    this.logger = new Logger(SignUpCommandHandler.name);
  }

  async execute(command: SignUpCommand): Promise<any> {
    this.logger.log(`In ${SignUpCommandHandler.name}`);
    const {
      body: { displayName, password, email, aboutMe },
    } = command;
    let hashedPassword: string = '';
    try {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    } catch (error) {
      this.logger.log(`Error: ${error}`);
      throw new HttpException(
        ErrorMessages.ENCRYPTION_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    const signUpObject = {
      displayName,
      email,
      aboutMe,
      hashedPassword,
    };
    try {
      const newUser = await this.repository.save(signUpObject);
      const token = this.jwtService.sign({ email: newUser.email });
      return { ...newUser, token };
    } catch (error) {
      throw new DatabaseException(error);
    }
  }
}
