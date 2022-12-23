import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AnswerQuestionDto {
  /**
   * ID of question being answered
   * @example 20
   */
  @IsNumber()
  @IsNotEmpty()
  questionId: number;

  /**
   * Answer to a question
   * @example Very long answer summary
   */
  @IsString()
  @IsNotEmpty()
  answer: string;
}
