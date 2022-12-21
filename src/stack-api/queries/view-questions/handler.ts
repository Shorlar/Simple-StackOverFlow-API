import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ViewQuestionsQuery } from './query';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from '../../entities';
import { Repository } from 'typeorm';
import { ErrorMessages } from '../../shared';

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
      this.logger.log(`Error: ${error}`);
      throw new HttpException(
        ErrorMessages.DATABASE_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
