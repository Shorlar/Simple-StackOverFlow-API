import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer, Question, User, Votes } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([User, Question, Answer, Votes])],
  controllers: [],
  providers: [],
})
export class StackApiModule {}
