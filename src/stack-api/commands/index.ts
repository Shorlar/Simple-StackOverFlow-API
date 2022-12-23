import { AnswerQuestionComandHandler } from './answer-question/handler';
import { AskQuestionCommandHandler } from './ask-question/handler';
import { SignInCommandHandler } from './sign-in/handler';
import { SignUpCommandHandler } from './sign-up/sign-up.handler';

export * from './sign-up/sign-up.command';
export * from './sign-in/command';
export * from './ask-question/command';
export * from './answer-question/comand';
export * from './vote/command';
export const commandHandlers = [
  SignUpCommandHandler,
  SignInCommandHandler,
  AskQuestionCommandHandler,
  AnswerQuestionComandHandler,
];
