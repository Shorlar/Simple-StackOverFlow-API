import { SignUpCommandHandler } from './sign-up/sign-up.handler';

export * from './sign-up/sign-up.command';
export const commandHandlers = [SignUpCommandHandler];
