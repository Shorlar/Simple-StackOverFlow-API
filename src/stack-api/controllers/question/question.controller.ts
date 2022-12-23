import {
  Controller,
  Logger,
  HttpCode,
  HttpStatus,
  Get,
  UseGuards,
  Query,
  Body,
  Post,
  UseInterceptors,
  ClassSerializerInterceptor,
  SerializeOptions
} from '@nestjs/common';
import { QueryBus, CommandBus } from '@nestjs/cqrs';
import { AskQuestionCommand } from '../../commands';
import { AskQuestionDto, ViewQuestionsQueryDto } from '../../dto';
import { User } from '../../entities';
import { AuthGuard } from '../../Guards';
import { ViewQuestionsQuery } from '../../queries';
import { SignedInUser } from '../../shared';

@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ excludePrefixes: ['hashed'] })
@Controller('question')
export class QuestionController {
  private readonly logger: Logger;
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {
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

  @HttpCode(HttpStatus.OK)
  @Post('/ask-question')
  async askQuestion(@Body() body: AskQuestionDto, @SignedInUser() user: User) {
    this.logger.log('In ask question controller');
    this.logger.log(
      `Calling commandBus.execute with an instance of ${AskQuestionCommand.name}`,
    );
    return await this.commandBus.execute(new AskQuestionCommand(body, user));
  }
}
