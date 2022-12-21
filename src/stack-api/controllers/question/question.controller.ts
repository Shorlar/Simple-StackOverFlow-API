import {
  Controller,
  Logger,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { AuthGuard } from '../../Guards';
import { ViewQuestions } from '../../queries';

@UseGuards(AuthGuard)
@Controller('question')
export class QuestionController {
  private readonly logger: Logger;
  constructor(private readonly queryBus: QueryBus) {
    this.logger = new Logger(QuestionController.name);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/view-questions')
  async viewQuestions() {
    this.logger.log('In view questions controller');
    this.logger.log(
      `Calling queryBus.execute with an instance of ${ViewQuestions.name}`,
    );
    return await this.queryBus.execute(new ViewQuestions());
  }
}
