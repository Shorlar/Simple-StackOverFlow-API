import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  Logger,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { SignUpCommand } from '../../commands';
import { SignUpDto } from '../../dto';

@Controller('auth')
export class AuthController {
  private readonly logger: Logger;
  constructor(private readonly commandBus: CommandBus) {
    this.logger = new Logger(AuthController.name);
  }
  
  @HttpCode(HttpStatus.OK)
  @Post('/sign-up')
  async signUp(@Body() body: SignUpDto) {
    this.logger.log('In sign up controller');
    this.logger.log(
      `Calling commandBus.execute with an instance of ${SignUpCommand.name}`,
    );
    return await this.commandBus.execute(new SignUpCommand(body));
  }
}
