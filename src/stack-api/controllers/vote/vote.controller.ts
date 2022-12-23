import {
  Controller,
  Logger,
  Post,
  HttpCode,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { VoteCommand } from '../../commands';
import { VoteDto } from '../../dto';
import { User } from '../../entities';
import { SignedInUser } from '../../shared';

@Controller('vote')
export class VoteController {
  public readonly logger: Logger;
  constructor(private readonly commandBus: CommandBus) {
    this.logger = new Logger(VoteController.name);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/')
  async voteQuestion(@Body() body: VoteDto, @SignedInUser() user: User) {
    this.logger.log('In vote question controller');
    this.logger.log(
      `Calling commandBus.execute with an instance of ${VoteCommand.name}`,
    );
    return await this.commandBus.execute(new VoteCommand(body, user));
  }
}
