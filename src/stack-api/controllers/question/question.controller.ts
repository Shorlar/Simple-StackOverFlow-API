import {
  Controller,
  Logger,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
  Query,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ViewQuestionsQueryDto } from '../../dto';
import { AuthGuard } from '../../Guards';
import { ViewQuestionsQuery } from '../../queries';

@UseGuards(AuthGuard)
@Controller('question')
export class QuestionController {
  private readonly logger: Logger;
  constructor(private readonly queryBus: QueryBus) {
    this.logger = new Logger(QuestionController.name);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/view-questions')
  async viewQuestions(@Query() param: ViewQuestionsQueryDto) {
    this.logger.log('In view questions controller');
    this.logger.log(
      `Calling queryBus.execute with an instance of ${ViewQuestionsQuery.name}`,
    );
    return await this.queryBus.execute(new ViewQuestionsQuery(param));
  }
}
