import { ICommand } from '@nestjs/cqrs';
import { AnswerQuestionDto } from '../../dto';
import { User } from '../../entities';

export class AnswerQuestionComand implements ICommand {
  constructor(
    public readonly body: AnswerQuestionDto,
    public readonly user: User,
  ) {}
}
