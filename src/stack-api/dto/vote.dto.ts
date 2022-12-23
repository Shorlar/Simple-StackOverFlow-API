import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { VoteType } from '../shared';

export class VoteDto {
  /**
   * Type of vote. should be either UP(upvote) or DOWN(downvote)
   * @example UP
   */
  @IsString()
  @IsNotEmpty()
  @IsEnum(VoteType)
  voteType: string;
}
