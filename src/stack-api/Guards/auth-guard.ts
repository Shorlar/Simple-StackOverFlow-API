import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User) private repository: Repository<User>,
    private configService: ConfigService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const {
      headers: { authorization },
    } = request;

    if (!authorization) {
      throw new HttpException('No Auth Token', HttpStatus.UNAUTHORIZED);
    }
    if (authorization.split(' ')[0] !== 'Bearer') {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    const token = authorization.split(' ')[1];
    let userEmail: string = '';
    try {
      const secret = this.configService.get<string>('SECRET_KEY');
      const { email } = this.jwtService.verify(token, { secret });
      userEmail = email;
    } catch (error) {
      console.log(error);
      throw new HttpException('Invalid Token', HttpStatus.UNAUTHORIZED);
    }
    request.user = await this.repository.findOne({
      where: { email: userEmail },
    });
    return true;
  }
}
