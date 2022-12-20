import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SignUpController } from './controllers';
import { Answer, Question, User, Votes } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Question, Answer, Votes]),
    CqrsModule,
  ],
  controllers: [SignUpController],
  providers: [],
})
export class StackApiModule {}
