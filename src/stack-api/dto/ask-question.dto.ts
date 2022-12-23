import { IsNotEmpty, IsString } from "class-validator"

export class AskQuestionDto{
    /**
     * Title of the question
     * @Example How does git work?
     */
    @IsString()
    @IsNotEmpty()
    title: string

    /**
     * Question body. A deeper explanation of the question
     * @Example I tried doing blah blah
     */
    @IsString()
    @IsNotEmpty()
    question: string
}