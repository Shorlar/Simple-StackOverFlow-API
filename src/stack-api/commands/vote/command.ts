import { ICommand } from '@nestjs/cqrs';
import { VoteDto } from '../../dto';
import { User } from '../../entities';

export class VoteCommand implements ICommand {
  constructor(public readonly body: VoteDto, public readonly user: User) {}
}
