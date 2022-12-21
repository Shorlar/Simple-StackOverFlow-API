import { ICommand } from '@nestjs/cqrs';
import { SignInDto } from '../../dto';

export class SignInCommand implements ICommand {
  constructor(public readonly body: SignInDto) {}
}
