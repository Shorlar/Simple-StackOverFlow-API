import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  Logger,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { SignInCommand, SignUpCommand } from '../../commands';
import { SignInDto, SignUpDto } from '../../dto';

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

  @HttpCode(HttpStatus.OK)
  @Post('/sign-in')
  async signIn(@Body() body: SignInDto){
    this.logger.log('In sign in controller')
    this.logger.log(
      `Calling commandBus.execute with an instance of ${SignInCommand.name}`,
    );
    return await this.commandBus.execute(new SignInCommand(body))
  }
}
