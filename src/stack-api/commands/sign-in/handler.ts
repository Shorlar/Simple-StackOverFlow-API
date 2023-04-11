import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities';
import { SignInCommand } from './command';
import { ErrorMessages } from '../../shared';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { DatabaseException } from '../../../util/database-exception';

@CommandHandler(SignInCommand)
export class SignInCommandHandler implements ICommandHandler<SignInCommand> {
  private logger: Logger;
  constructor(
    @InjectRepository(User) private repository: Repository<User>,
    private jwtService: JwtService,
  ) {
    this.logger = new Logger(SignInCommandHandler.name);
  }

  async execute(command: SignInCommand): Promise<any> {
    this.logger.log(`In ${SignInCommandHandler.name}`);
    const {
      body: { email, password },
    } = command;
    let isUserExists: User = null;
    try {
      isUserExists = await this.repository.findOne({ where: { email } });
    } catch (error) {
      throw new DatabaseException(error);
    }
    if (!isUserExists) {
      throw new HttpException(
        ErrorMessages.INVALID_USER,
        HttpStatus.BAD_REQUEST,
      );
    }
    const { hashedPassword } = isUserExists;
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordValid) {
      throw new HttpException(
        ErrorMessages.INVALID_USER,
        HttpStatus.BAD_REQUEST,
      );
    }
    const token = this.jwtService.sign({ email: isUserExists.email });
    this.logger.log('Done sign-in user');
    return { ...isUserExists, token };
  }
}
