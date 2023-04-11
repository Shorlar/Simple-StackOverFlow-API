import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { ViewQuestionsQuery } from './query';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from '../../entities';
import { Repository } from 'typeorm';
import { DatabaseException } from '../../../util/database-exception';

@QueryHandler(ViewQuestionsQuery)
export class ViewQuestionsQueryHandler
  implements IQueryHandler<ViewQuestionsQuery>
{
  private logger: Logger;
  constructor(
    @InjectRepository(Question) private repository: Repository<Question>,
  ) {
    this.logger = new Logger(ViewQuestionsQueryHandler.name);
  }

  async execute(query: ViewQuestionsQuery): Promise<any> {
    this.logger.log(`In ${ViewQuestionsQueryHandler.name}`);
    const {
      param: { limit, offset },
    } = query;
    try {
      const questions = await this.repository.find({
        skip: offset || 0,
        take: limit || 10,
        order: { creationDate: 'DESC' },
      });
      this.logger.log('Done fetching Questions');
      return questions;
    } catch (error) {
      throw new DatabaseException(error);
    }
  }
}
