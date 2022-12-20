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

@Controller('sign-up')
export class SignUpController {
  private readonly logger: Logger;
  constructor(private readonly commandBus: CommandBus) {
    this.logger = new Logger(SignUpController.name);
  }
  @Post('/')
  @HttpCode(HttpStatus.OK)
  async createDepartment(@Body() body: SignUpDto) {
    this.logger.log('In sign up controller');
    this.logger.log(
      `Calling commandBus.execute with an instance of ${SignUpCommand.name}`,
    );
    return await this.commandBus.execute(new SignUpCommand(body));
  }
}
