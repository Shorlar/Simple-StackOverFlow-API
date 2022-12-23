import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AskQuestionCommand } from './command';
import { Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from '../../entities';
import { Repository } from 'typeorm';
import { ErrorMessages } from '../../shared';

@CommandHandler(AskQuestionCommand)
export class AskQuestionCommandHandler
  implements ICommandHandler<AskQuestionCommand>
{
  private readonly logger: Logger;
  constructor(
    @InjectRepository(Question)
    private readonly repository: Repository<Question>,
  ) {
    this.logger = new Logger(AskQuestionCommandHandler.name);
  }

  async execute(command: AskQuestionCommand): Promise<any> {
    this.logger.log(`In ${AskQuestionCommandHandler.name}`);
    const {
      body: { title, question },
      user,
    } = command;
    const questionObject = {
      title,
      questionBody: question,
      user,
      userDisplayName: user.displayName,
    };
    try {
      const question = await this.repository.save(questionObject);
      this.logger.log('Done saving question');
      return question;
    } catch (error) {
      this.logger.log(`Error: ${error}`);
      throw new HttpException(
        ErrorMessages.DATABASE_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
