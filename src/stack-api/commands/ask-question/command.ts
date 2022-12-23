import { ICommand } from '@nestjs/cqrs';
import { AskQuestionDto } from '../../dto';
import { User } from '../../entities';

export class AskQuestionCommand implements ICommand {
  constructor(
    public readonly body: AskQuestionDto,
    public readonly user: User,
  ) {}
}
