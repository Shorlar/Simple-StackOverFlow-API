import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { commandHandlers } from './commands';
import {
  AuthController,
  QuestionController,
  VoteController,
} from './controllers';
import { Answer, Question, User, Votes } from './entities';
import { IsValueExistConstraint } from './shared';
import { ConfigService } from '@nestjs/config';
import { queryHandlers } from './queries';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Question, Answer, Votes]),
    CqrsModule,
    JwtModule.register({
      secret: `${new ConfigService().get<string>('SECRET_KEY')}`,
      signOptions: { expiresIn: '7 days' },
    }),
  ],
  controllers: [AuthController, QuestionController, VoteController],
  providers: [IsValueExistConstraint, ...commandHandlers, ...queryHandlers],
})
export class StackApiModule {}
