import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { VoteCommand } from './command';
import { Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question, Votes } from '../../entities';
import { Repository } from 'typeorm';
import { ErrorMessages } from '../../shared';

@CommandHandler(VoteCommand)
export class VoteCommandHandler implements ICommandHandler<VoteCommand> {
  private readonly logger: Logger;
  constructor(
    @InjectRepository(Votes)
    private votesRepository: Repository<Votes>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {
    this.logger = new Logger(VoteCommandHandler.name);
  }

  async execute(command: VoteCommand): Promise<any> {
    this.logger.log(`In ${VoteCommandHandler.name}`);
    const {
      body: { voteType, questionId },
      user,
    } = command;
    let question: Question = null;
    try {
      question = await this.questionRepository.findOne({
        where: { id: questionId },
      });
    } catch (error) {
      this.logger.log(`Error: ${error}`);
      throw new HttpException(
        ErrorMessages.DATABASE_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    if (!question) {
      throw new HttpException(
        ErrorMessages.INVALID_QUESTION,
        HttpStatus.BAD_REQUEST,
      );
    }
    let isVoteExists: Votes = null;
    try {
      isVoteExists = await this.votesRepository.findOne({
        relations: { question: true, user: true },
        where: { question: { id: questionId }, user: { id: user.id } },
      });
    } catch (error) {
      this.logger.log(`Error: ${error}`);
      throw new HttpException(
        ErrorMessages.DATABASE_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    if (isVoteExists) {
      if (isVoteExists.voteType === voteType) {
        throw new HttpException(
          'Cannot place same vote type twice',
          HttpStatus.BAD_REQUEST,
        );
      } else if (isVoteExists.voteType === 'UP') {
        try {
          await this.votesRepository.update(isVoteExists.id, {
            voteType: 'DOWN',
          });
        } catch (error) {
          this.logger.log(`Error: ${error}`);
          throw new HttpException(
            ErrorMessages.DATABASE_ERROR,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
        await this.updateScore(questionId, -1);
        return 'downvote successful';
      } else {
        try {
          await this.votesRepository.update(isVoteExists.id, {
            voteType: 'UP',
          });
        } catch (error) {
          this.logger.log(`Error: ${error}`);
          throw new HttpException(
            ErrorMessages.DATABASE_ERROR,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
        await this.updateScore(questionId, +1);
        return 'upvote successful';
      }
    } else {
      const voteObject = {
        user,
        question,
        voteType,
      };
      try {
        await this.votesRepository.save(voteObject);
      } catch (error) {
        this.logger.log(`Error: ${error}`);
        throw new HttpException(
          ErrorMessages.DATABASE_ERROR,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      if (voteType === 'UP') {
        await this.updateScore(questionId, +1);
      } else {
        await this.updateScore(questionId, -1);
      }
      this.logger.log('Done saving vote');
      return `${voteType.toLowerCase()}vote successful`;
    }
  }

  async updateScore(id: number, scoreAmount: number): Promise<void> {
    this.logger.log('In update score method');
    let score: number = 0;
    try {
      const question = await this.questionRepository.findOne({ where: { id } });
      score += question.score + scoreAmount;
      await this.questionRepository.update(id, { score: score });
      this.logger.log('Done updating score');
    } catch (error) {
      this.logger.log(`Error: ${error}`);
      throw new HttpException(
        ErrorMessages.DATABASE_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
