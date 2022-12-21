import { ICommand } from '@nestjs/cqrs';
import { SignUpDto } from '../../dto';

export class SignUpCommand implements ICommand {
  constructor(public readonly body: SignUpDto) {}
}
