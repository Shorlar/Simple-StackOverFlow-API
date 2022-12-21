import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class ViewQuestionsQueryDto {
  /**
   * Number of data to return.Defaults to 10
   * @example 20
   */
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  limit: number;

  /**
   * Number of data to skip.Defaults to 0
   * @example 1
   */
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  offset: number;
}
