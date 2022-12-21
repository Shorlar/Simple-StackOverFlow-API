import { IQuery } from '@nestjs/cqrs';
import { ViewQuestionsQueryDto } from '../../dto';

export class ViewQuestionsQuery implements IQuery {
  constructor(public readonly param: ViewQuestionsQueryDto) {}
}
